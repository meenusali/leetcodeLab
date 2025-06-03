import React, { useState } from "react"
import { User, Code, LogOut, Menu, ChevronDown, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = ()=>{
    const {authUser} = useAuthStore()
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const isActivePath = (path) => {
      if (path === '/') {
        return location.pathname === '/'
      }
      return location.pathname.startsWith(path)
    }

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
     <nav className="sticky top-0 z-50 w-full bg-[#0f172a]">
      <div className="flex w-full justify-between items-center mx-auto max-w-7xl px-6 py-4">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/logo.png" 
                className="h-9 w-9 rounded-lg"
                alt="Codexium Logo"
              />
            </div>
            <span className="text-xl font-bold text-white hidden md:block">
              Codexium
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActivePath('/') 
                  ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-white font-medium shadow-lg shadow-indigo-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Problems
            </Link>
            <Link 
              to="/explore" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActivePath('/explore') 
                  ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-white font-medium shadow-lg shadow-indigo-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Explore
            </Link>
            <Link 
              to="/contests" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActivePath('/contests') 
                  ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-white font-medium shadow-lg shadow-indigo-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Contests
            </Link>
            <Link 
              to="/leaderboard" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActivePath('/leaderboard') 
                  ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-white font-medium shadow-lg shadow-indigo-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Leaderboard
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 top-[4.5rem] bg-[#1e293b] border-t border-white/10 md:hidden">
              <div className="px-4 py-2 space-y-1">
                <Link 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActivePath('/') 
                      ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-white font-medium' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Problems
                </Link>
                <Link 
                  to="/explore" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActivePath('/explore') 
                      ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-white font-medium' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Explore
                </Link>
                <Link 
                  to="/contests" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActivePath('/contests') 
                      ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-white font-medium' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Contests
                </Link>
                <Link 
                  to="/leaderboard" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActivePath('/leaderboard') 
                      ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-white font-medium' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Leaderboard
                </Link>
                <div className="divider my-2"></div>
                <Link 
                  to="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
                {authUser?.role === "ADMIN" && (
                  <Link 
                    to="/add-problem" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
                  >
                    <Code className="w-4 h-4" />
                    <span>Add Problem</span>
                  </Link>
                )}
                <div className="divider my-2"></div>
                <LogoutButton className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg w-full">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </LogoutButton>
              </div>
            </div>
          )}

          {/* Desktop User Menu */}
          <div className="dropdown dropdown-end hidden md:block">
            <label tabIndex={0} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer group">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img
                  src={authUser?.image || "/boy.png"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white">{authUser?.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors group-hover:rotate-180 duration-200" />
              </div>
            </label>

            <ul tabIndex={0} className="dropdown-content menu mt-2 p-2 bg-[#1e293b] rounded-xl w-56 shadow-xl border border-white/10">
              <li className="menu-title px-3 py-2">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{authUser?.name}</span>
                  <span className="text-xs text-gray-400">{authUser?.email}</span>
                </div>
              </li>
              <div className="divider my-1"></div>
              
              <li>
                <Link to={`/profile`} className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5">
                  <User className="w-4 h-4" />
                  <span className="text-sm">My Profile</span>
                </Link>
              </li>

              {authUser?.role === "ADMIN" && (
                <li>
                  <Link to="/add-problem" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5">
                    <Code className="w-4 h-4" />
                    <span className="text-sm">Add Problem</span>
                  </Link>
                </li>
              )}

              <div className="divider my-1"></div>

              <li>
                <LogoutButton className="flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    )
}

const styles = `
.nav-link {
  @apply text-gray-400 hover:text-white transition-colors;
}
`;

export default Navbar;