import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import auth from "../../firebase/firebase.config";

const Navbar = () => {
  const { pathname } = useLocation();
  const {
    user: { email, role },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(logout());
    });
  };

  return (
    <div>
      <nav
        className={`h-14 fixed w-full z-[999] ${
          pathname === "/" ? null : "bg-white"
        }`}
      >
        <ul className="max-w-[1600px] mx-auto flex gap-3 h-full items-center">
          <li className="flex-auto font-semibold text-2xl text-primary">
            <Link to="/">JobHunt</Link>
          </li>
          <li>
            <Link className="hover:text-primary" to="/employers">
              Employers
            </Link>
          </li>
          <li>
            <Link className="hover:text-primary" to="/candidates">
              Candidates
            </Link>
          </li>
          <li>
            <Link className="hover:text-primary" to="/jobs">
              Jobs
            </Link>
          </li>

          {email ? (
            <button
              onClick={handleLogout}
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all"
            >
              Logout
            </button>
          ) : (
            <li>
              <Link
                className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
                to="/login"
              >
                Login
              </Link>
            </li>
          )}

          {email && role && (
            <li>
              <Link
                className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
          {email && !role && (
            <li>
              <Link
                className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
                to="/register"
              >
                Get Started
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
