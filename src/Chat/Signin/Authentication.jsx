import React, { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { FcGoogle } from "react-icons/fc";
function Authentication() {
  const { googleSignIn } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-chat-900">
      <div className="bg-chat-green-500 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Sign In
        </h2>
        <div className="py-2 px-4 rounded-xl flex justify-center items-center gap-2 bg-chat-green-600">
          <FcGoogle size={25} />
          <div onClick={googleSignIn} className="text-neutral-300">
            Sign In With Google
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
