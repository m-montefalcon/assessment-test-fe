import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/"); // Navigate to home page
    } catch (error) {
      console.error("Error during logout", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Geolocator by Meinardz</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Settings</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <button onClick={handleLogout} disabled={isLoading}>
                      {isLoading ? "Logging out..." : "Logout"}
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
