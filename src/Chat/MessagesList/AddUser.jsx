import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/UserContext";
function AddUser({ setAddUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth(); // Get the current user from the authentication hook

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm === "") {
        setUsers([]);
        return;
      }

      setLoading(true);

      try {
        const q = query(
          collection(db, "users"),
          where("fullName", ">=", searchTerm),
          where("fullName", "<=", searchTerm + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filtered = userList.filter((user) => user.id !== currentUser.uid);
        // console.log(filtered);
        setUsers(filtered);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }

      setLoading(false);
    };

    fetchUsers();
  }, [searchTerm]);

  const handleUserSelect = async (selectedUser) => {
    if (!currentUser) {
      console.error("No current user found.");
      return;
    }

    try {
      // Create a new document in the "messages" collection
      console.log(currentUser.uid, selectedUser);

      // Create or update a document in the "messages" collection with the chatId
      const messageCollectionRef = collection(db, "messages");
      const messageDocRef = await addDoc(messageCollectionRef, {
        createdAt: new Date(),
      });
      const docId = messageDocRef.id;
      await setDoc(
        messageDocRef,
        {
          chatId: docId,
        },
        { merge: true }
      );
      // Create the subcollection "users" inside the newly created message document
      const usersSubCollectionRef = collection(messageDocRef, "users");
      // Add the currentUser's UID to the "users" subcollection
      await setDoc(doc(usersSubCollectionRef, currentUser.uid), {
        userId: currentUser.uid,
        fullName: currentUser.displayName, // or whatever field you use for the current user's name
        photoURL: currentUser.photoURL,
      });

      // Add the selectedUser's ID to the "users" subcollection
      await setDoc(doc(usersSubCollectionRef, selectedUser.id), {
        userId: selectedUser.id,
        fullName: selectedUser.fullName,
        photoURL: selectedUser.photoUrl,
      });

      console.log(
        "Message document created, and users added to subcollection."
      );
      setAddUser(false); // Close the Add User modal after selection
    } catch (error) {
      console.error("Error creating message or adding users: ", error);
    }
  };

  return (
    <div className="absolute top-0 z-[9999] w-full h-full backdrop-blur-sm bg-opacity-50 bg-black flex justify-center items-center">
      <div className="bg-[#2A2F32] w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#E9EDEF] text-xl font-semibold">Add User</h2>
          <button
            className="text-[#00AF9C] hover:text-[#075E54] font-semibold"
            onClick={() => setAddUser(false)}
          >
            Close
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for users..."
            className="w-full p-3 rounded-md bg-[#323739] text-[#E9EDEF] placeholder-[#6A7175] outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-[#99AAB5]">
          {loading ? (
            <p>Loading...</p>
          ) : users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="p-2 border-b border-[#323739] cursor-pointer"
                onClick={() => handleUserSelect(user)} // Handle user selection
              >
                <p className="text-[#E9EDEF]">{user.fullName}</p>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddUser;
