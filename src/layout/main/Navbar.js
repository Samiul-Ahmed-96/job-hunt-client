import { Transition } from "@headlessui/react";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import auth from "../../firebase/firebase.config";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
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
      {/*<nav
        className={`h-14 bg-white  fixed w-full z-[999] lg:px-0 md:px-4`}
      >
        <ul className="container  mx-auto flex gap-3 h-full items-center">
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

        
          {email && <Link title="Go To Chat" className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all" to={'/chat'}>
            <BsChatDots/>
          </Link>}
          
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
          {email ? (
            <button
              title="Logout"
              onClick={handleLogout}
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all"
            >
              <FiLogOut/>
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
        </ul>
      </nav>*/}

      <nav className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-0">
          <div>
            <div className="h-16 flex justify-between  items-center">
              <div className="flex-shrink-0">
                <li className="flex-auto font-semibold text-2xl text-primary list-none">
                  <Link to="/">JobHunt</Link>
                </li>
              </div>
              <div className="hidden md:block">
                <ul className="container  mx-auto flex gap-3 h-full items-center">
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

                  {email && (
                    <Link
                      title="Go To Chat"
                      className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all"
                      to={"/chat"}
                    >
                      <BsChatDots />
                    </Link>
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
                  {email ? (
                    <button
                      title="Logout"
                      onClick={handleLogout}
                      className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all"
                    >
                      <FiLogOut />
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
                </ul>
              </div>
              <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
            </div>
            
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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

                {email && (
                  <Link
                    title="Go To Chat"
                    className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all"
                    to={"/chat"}
                  >
                    <BsChatDots />
                  </Link>
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
                {email ? (
                  <button
                    title="Logout"
                    onClick={handleLogout}
                    className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all"
                  >
                    <FiLogOut />
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
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};

export default Navbar;
