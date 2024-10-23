import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service"; 
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await authService.login(username, password);
          console.log('Login successful', response.data);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("userName", response.data.username);
          localStorage.setItem("userEmail", response.data.email);
          localStorage.setItem("userRole", response.data.roles);

          Swal.fire({
              title: 'Login Successful!',
              text: 'Welcome back, ' + response.data.username,
              icon: 'success',
              confirmButtonText: 'OK'
          }).then(() => {
              navigate("/"); 
          });
      } catch (error) {
          console.error('Login failed', error.response.data);
          Swal.fire({
              title: 'Login Failed!',
              text: error.response.data.message || 'Please try again.',
              icon: 'error',
              confirmButtonText: 'Retry'
          });
      }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold text-center">Login</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <label htmlFor="username" className="block text-sm font-medium">Username</label>
                      <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                      />
                  </div>

                  <div>
                      <label htmlFor="password" className="block text-sm font-medium">Password</label>
                      <div className="relative">
                          <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                          />
                          <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 flex items-center pr-2 text-[#A020F0]"
                          >
                              {showPassword ? "Hide" : "Show"}
                          </button>
                      </div>
                  </div>

                  <button
                      type="submit"
                      className="w-full px-4 py-2 font-semibold text-white"
                      style={{ backgroundColor: "#A020F0" }}
                  >
                      Login
                  </button>
              </form>
          </div>
      </div>
  );
};

export default Login;