import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaShoppingCart, FaHeart, FaUser, FaLockOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../Helpers/UsersContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Last Stock", href: "/last-stock" },
  { name: "Daily Special", href: "/daily-special" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const notify = (msg) => toast(msg);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { userName, user, setUser, img, setUserName, setImg } =
    useContext(AuthContext);

  // Handle logout action
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );
      // Handle Success Response 200
      if (response.status === 200) {
        // Clear user state from localStorage
        const userData = {
          isUser: false,
          userName: null,
          img: null,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        localStorage.removeItem("user");

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          const { isUser, userName, img } = storedUser;
          setUser(isUser);
          setUserName(userName);
          setImg(img);
        }
        notify(`${userName} logout successful`);
        navigate("/login");
      }
      // Handle 401 error
      if (response.status === 401) {
        notify(`Please Login first`);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Brand and Logo */}
          <div className="flex items-center">
            <img
              src="/images/users/logo.png"
              alt="Logo"
              className="h-8 w-8 mr-2"
            />
            <Link to="/" className="text-xl font-bold text-red-400">
              Sagor Departmental
            </Link>
          </div>

          {/* Middle: Search Bar */}
          <div className="flex-1 mx-4 hidden md:block px-4">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-4 pr-8 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16l-4-4m0 0l4-4m-4 4h14M5 12h14"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Right side: User Actions */}
          <div className="flex items-center">
            {user ? (
              <>
                {/* Cart Link / */}
                <Link
                  to="/cart"
                  className="relative ml-4 text-gray-600 hover:text-gray-800"
                >
                  <FaShoppingCart className="text-xl" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    3
                  </span>
                </Link>
                {/* Favorite Link  */}
                <Link
                  to="/favorites"
                  className="ml-4 text-gray-600 hover:text-gray-800"
                >
                  <FaHeart className="text-xl" />
                </Link>
                {/* User Link  */}
                <Link
                  to="/profile-user"
                  className="ml-4 text-gray-600 hover:text-gray-800"
                >
                  <img
                    src={img}
                    alt={userName}
                    className="w-8 h-8 rounded-full mx-auto border-2"
                  />
                  {userName}
                </Link>
                <Link
                  onClick={() => {
                    setUser(false);
                    handleLogout();
                  }}
                  to="/"
                  className="ml-4 text-gray-600 hover:text-gray-800"
                >
                  <FaLockOpen className="text-xl text-red-600" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className=" border-yellow-400 ml-4 rounded-xl px-2 py-1 text-gray-600  hover:text-red-400 hover:bg-red-200"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="ml-4 border-1 text-white bg-red-400 rounded-xl px-2 py-1 hover:text-red-400 hover:bg-red-200 "
                >
                  Login
                </Link>
              </>
            )}
            <button
              type="button"
              className="ml-4 text-gray-600 hover:text-gray-800 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Sagor Departmental</span>
                <img
                  className="h-8 w-auto"
                  src="/images/users/logo.png"
                  alt="Logo"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    to={user ? "/user" : "/login"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {user ? "My Account" : "Log in"}
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </div>
    </nav>
  );
}
