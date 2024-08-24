import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Toast from "../common/Toast";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    const isNameValid = formData.name.trim() !== "";
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = formData.password.length >= 8;
    setIsFormValid(isNameValid && isEmailValid && isPasswordValid);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/register`,
        formData
      );
      if (response.status === 200) {
        console.log(response.data);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError("Failed Registration. Please try again.");
    }
    console.log(formData);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <form
          className="bg-gray-800 p-8 rounded shadow-md w-96"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl mb-6 text-center text-white">Sign Up</h2>
          <div className="mb-6">
            <label className="input input-bordered flex items-center gap-2 mb-6">
              Name
              <input
                type="text"
                className="grow"
                placeholder="e.g Juan Dela Cruz"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
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
                type="email"
                className="grow"
                placeholder="Email"
                name="email"
                value={formData.email}
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
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                value={formData.password}
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
              Register
            </button>
            <div className="w-full border-t border-gray-600 my-6"></div>
            <span></span>
            <Link to="/login" className="text-emerald-300">
              Login Instead
            </Link>
          </div>
        </form>
      </div>
      {error && <Toast text={error || null} duration={3000} />}
    </>
  );
};

export default Register;
