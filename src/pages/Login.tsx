import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";
// Set axios to include credentials with requests
axios.defaults.withCredentials = true;

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    const isEmailValid = validateEmail(loginForm.email);
    const isPasswordValid = loginForm.password.length >= 8;
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [loginForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Step 1: Get CSRF cookie
      await axios.get(`${import.meta.env.VITE_BASE_URL}/sanctum/csrf-cookie`);

      // Step 2: Log in
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        loginForm
      );

      console.log(response.data); // Successful login message

      // Step 3: Save token to local storage
      localStorage.setItem("token", response.data.token);

      // Step 4: Navigate to /home
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <form
          className="bg-gray-800 p-8 rounded shadow-md w-96"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl mb-6 text-center text-white">Login</h2>
          <div className="mb-6">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                name="email"
                value={loginForm.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                name="password"
                value={loginForm.password}
                placeholder="Password"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-800"
              disabled={!isFormValid}
            >
              Login
            </button>
            <div className="w-full border-t border-gray-600 my-6"></div>
            <span></span>
            <Link to="/register" className="text-emerald-300">
              Register Instead
            </Link>
          </div>
        </form>
      </div>
      {error && <Toast text={error || null} duration={3000} />}
    </>
  );
};

export default Login;
