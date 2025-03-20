import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "./AuthStyles.css";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
 
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="auth-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your account</p>
        </motion.div>

        <form onSubmit={submitHandler} className="auth-form">
          <motion.div 
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="input-icon-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="input-icon-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="forgot-password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link to="/forgot-password" className="auth-link">
              Forgot Password?
            </Link>
          </motion.div>

          <motion.button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {isLoading ? (
              <div className="loader-container">
                <div className="spinner"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        <motion.div 
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
