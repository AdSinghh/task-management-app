import React, { useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth.context";

function Header() {
  const auth = useContext(AuthContext);

  // Common button classes for reuse
  const buttonClasses =
    "bg-richblack-800 hover:bg-richblack-700 text-white py-2 px-4 rounded-lg border border-richblack-700 transition duration-300";

  return (
    <header className="bg-richblack-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4 max-w-6xl">
        <Link to="/" className="text-2xl font-bold">
      <h1>TODO</h1>
        </Link>

        <nav className="flex items-center space-x-4">
          {!auth.user ? (
            <>
              <Link to="/login">
                <button className={buttonClasses}>Login</button>
              </Link>
              <Link to="/signup">
                <button className={buttonClasses}>Sign Up</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <button className={buttonClasses}>Dashboard</button>
              </Link>
              <button
                onClick={async () => {
                  await auth.signout();
                  toast.success("Logout Successfully");
                }}
                className={buttonClasses}
              >
                Log Out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

