import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLogoutMutation } from "../slices/userApiSlice"
import { logout } from "../slices/authSlice"
import { useNavigate, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FaSignInAlt, FaSignOutAlt, FaUser, FaCaretDown } from "react-icons/fa"
import { FiMenu, FiX } from "react-icons/fi"
import "./Header.css"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef(null)

  const { userInfo } = useSelector((state) => state.auth)
  const [logoutApiCall] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false)
  }, [navigate])

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    console.log("Toggle dropdown, current state:", showDropdown)
    setShowDropdown(!showDropdown)
  }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      setShowDropdown(false)
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  // Inline styles for dropdown
  const dropdownStyles = {
    container: {
      position: "relative",
      display: "inline-block"
    },
    toggle: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontWeight: "500"
    },
    menu: {
      position: "absolute",
      top: "100%",
      right: "0",
      width: "200px",
      backgroundColor: "white",
      borderRadius: "4px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
      marginTop: "8px",
      overflow: "hidden"
    },
    item: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 16px",
      width: "100%",
      textAlign: "left",
      background: "none",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s"
    },
    itemHover: {
      backgroundColor: "#f5f5f5"
    }
  }

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">
            <span className="logo-text">MERN Auth</span>
          </Link>
        </motion.div>


        {/* Desktop Navigation */}
        <motion.nav
          className="desktop-nav"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {userInfo ? (
            <div style={dropdownStyles.container} ref={dropdownRef}>
              <motion.button
                style={dropdownStyles.toggle}
                onClick={toggleDropdown}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span>{userInfo.name}</span>
                <FaCaretDown />
              </motion.button>

              {showDropdown && (
                <div style={dropdownStyles.menu}>
                  <Link 
                    to="/profile" 
                    style={dropdownStyles.item}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f5"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    <FaUser />
                    <span>Profile</span>
                  </Link>
                  <button 
                    onClick={logoutHandler} 
                    style={dropdownStyles.item}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f5"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link to="/login" className="nav-link">
                  <FaSignInAlt />
                  <span>Sign In</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link to="/register" className="nav-link signup">
                  <FaSignOutAlt />
                  <span>Sign Up</span>
                </Link>
              </motion.div>
            </div>
          )}
        </motion.nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {userInfo ? (
                <div className="mobile-nav-items">
                  <div className="mobile-user-info">
                    <span>Hello, {userInfo.name}</span>
                  </div>
                  <Link to="/profile" className="mobile-nav-link">
                    <FaUser />
                    <span>Profile</span>
                  </Link>
                  <button onClick={logoutHandler} className="mobile-nav-link">
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="mobile-nav-items">
                  <Link to="/login" className="mobile-nav-link">
                    <FaSignInAlt />
                    <span>Sign In</span>
                  </Link>
                  <Link to="/register" className="mobile-nav-link">
                    <FaSignOutAlt />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header