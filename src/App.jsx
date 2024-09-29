import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/UserContext";
// import MessagesList from "./components/Chat/MessagesList/MessagesList";
// import Chat from "./components/Chat/Chat";
import Chat from "./Chat/Chat";
import Authentication from "./Chat/Signin/Authentication";
function App() {
  const { googleSignIn, logout, currentUser, dbUser } = useAuth();

  return (
    <>
      {/* <div className="text-black">hello</div> */}
      {/* <div className="mt-4 bg-red-400" onClick={googleSignIn}>
        Login
      </div>
      <div className="mt-4 bg-red-400" onClick={logout}>
        Logout
      </div> */}
      {/* <MessagesList /> */}
      <Routes>
        <Route path="/" element={currentUser ? <Chat /> : <Authentication />} />
      </Routes>
    </>
  );
}

export default App;
