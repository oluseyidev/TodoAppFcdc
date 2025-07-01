import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between px-4 py-3 bg-gray-800 text-white">
      <Link to="/" className="text-lg font-bold">
        Odin TODO
      </Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
