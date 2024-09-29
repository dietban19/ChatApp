import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { db, auth } from "../config/firebase"; // Ensure firebase is initialized in config

// Create the Auth context
const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Firebase Auth User
  // const [dbUser, setDbUser] = useState(null); // Firestore User Data
  const [loading, setLoading] = useState(true); // Loading state for authentication

  // Function to sign in with Google
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider); // Google sign-in
      const user = result.user;

      if (user) {
        const { displayName, email, uid, photoURL } = user;
        const createdAt = new Date(); // Current date

        // Reference to Firestore document for the user
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);

        // If user does not exist in Firestore, add the new user document
        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            fullName: displayName,
            email,
            createdAt,
            photoUrl: photoURL,
            userId: uid, // Store the Firebase Auth UID as userId
          });
        }

        setCurrentUser(user); // Update the currentUser state with the authenticated user
      }
    } catch (error) {
      console.error("Error during Google Sign-In", error); // Handle sign-in errors
    }
  };

  // Function to log out the current user
  const logout = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      setCurrentUser(null); // Clear the current user state after signing out
      // setDbUser(null); // Clear Firestore user state after signing out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  // Listen for authentication state changes and update currentUser
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Update currentUser whenever auth state changes
      setLoading(false); // Set loading to false once the auth state is determined
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);
  // useEffect to listen for authentication state changes
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     setCurrentUser(user); // Set current user in the auth state
  //     setLoading(false); // Set loading to false when auth state is determined

  //     if (user) {
  //       try {
  //         // Get the user data from Firestore
  //         const userDocRef = doc(db, 'users', user.uid);
  //         const userDocSnap = await getDoc(userDocRef);

  //         if (userDocSnap.exists()) {
  //           // Set dbUser state with Firestore data
  //           setDbUser(userDocSnap.data());
  //         } else {
  //           // Handle case where user is authenticated but not found in Firestore
  //           setDbUser(null);
  //           console.warn('User authenticated but no Firestore record found');
  //         }
  //       } catch (error) {
  //         console.error('Error fetching Firestore user data:', error);
  //       }
  //     } else {
  //       // Clear dbUser if no user is authenticated
  //       setDbUser(null);
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  // Context value that will be provided to children
  const value = {
    currentUser,
    // dbUser,
    googleSignIn,
    logout,
  };

  // Return the provider with the AuthContext
  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children when not loading */}
    </AuthContext.Provider>
  );
};
