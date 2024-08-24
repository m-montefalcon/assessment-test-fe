import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../common/Nav";
import Modal from "../common/Modal";
import Toast from "../common/Toast"; // Import Toast component

interface GeoData {
  city: string;
  country: string;
  created_at: string;
  id: number;
  ip: string;
  loc: string;
  org: string;
  postal: string;
  region: string;
  timezone: string;
  user_ip: string;
  user_loc: string;
  user_city: string;
  user_region: string;
  user_country: string;
  user_org: string;
  user_postal: string;
  user_timezone: string;
  updated_at: string;
}

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [geoDataList, setGeoDataList] = useState<GeoData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(""); // State for error message

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in local storage");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/sanctum/csrf-cookie`);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/geo`,
        { searchValue: searchValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data); // Handle the response data as needed
      setGeoDataList((prevData) => [...prevData, response.data.data]); // Append new data to the existing list
      setSearchValue(""); // Clear the search input on success
    } catch (error) {
      console.error("Error during the request", error);
      const err = error as {
        response: {
          data: { message: string };
          request: { statusText: string };
        };
      };
      setError(
        `${err.response.data.message}. ${err.response.request.statusText}`
      );
      setSearchValue(""); // Clear the search input on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      {error && <Toast text={error} />}
      {/* Conditionally render Toast with error message */}
      <Nav />
      <div className="h-full w-full flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-5xl mt-10">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
              className={`h-4 w-4 opacity-70 hover:bg-slate-50 rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => !isLoading && setIsModalOpen(!isModalOpen)}
            >
              <path d="M536.1 273H488c-4.4 0-8 3.6-8 8v275.3c0 2.6 1.2 5 3.3 6.5l165.3 120.7c3.6 2.6 8.6 1.9 11.2-1.7l28.6-39c2.7-3.7 1.9-8.7-1.7-11.2L544.1 528.5V281c0-4.4-3.6-8-8-8zm219.8 75.2l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3L752.9 334.1a8 8 0 003 14.1zm167.7 301.1l-56.7-19.5a8 8 0 00-10.1 4.8c-1.9 5.1-3.9 10.1-6 15.1-17.8 42.1-43.3 80-75.9 112.5a353 353 0 01-112.5 75.9 352.18 352.18 0 01-137.7 27.8c-47.8 0-94.1-9.3-137.7-27.8a353 353 0 01-112.5-75.9c-32.5-32.5-58-70.4-75.9-112.5A353.44 353.44 0 01171 512c0-47.8 9.3-94.2 27.8-137.8 17.8-42.1 43.3-80 75.9-112.5a353 353 0 01112.5-75.9C430.6 167.3 477 158 524.8 158s94.1 9.3 137.7 27.8A353 353 0 01775 261.7c10.2 10.3 19.8 21 28.6 32.3l59.8-46.8C784.7 146.6 662.2 81.9 524.6 82 285 82.1 92.6 276.7 95 516.4 97.4 751.9 288.9 942 524.8 942c185.5 0 343.5-117.6 403.7-282.3 1.5-4.2-.7-8.9-4.9-10.4z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className={`h-4 w-4 opacity-70 hover:bg-slate-50 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => !isLoading && handleSubmit()}
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="overflow-x-auto w-full">
            {geoDataList.length > 0 ? (
              <table className="table-auto w-full border-separate border-spacing-2">
                <thead>
                  <tr>
                    <th className="px-6 py-3">City</th>
                    <th className="px-6 py-3">Country</th>
                    <th className="px-6 py-3">IP</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Organization</th>
                    <th className="px-6 py-3">Postal</th>
                    <th className="px-6 py-3">Region</th>
                    <th className="px-6 py-3">Timezone</th>
                    <th className="px-6 py-3">User City</th>
                    <th className="px-6 py-3">User Country</th>
                    <th className="px-6 py-3">User IP</th>
                    <th className="px-6 py-3">User Location</th>
                    <th className="px-6 py-3">User Organization</th>
                    <th className="px-6 py-3">User Postal</th>
                    <th className="px-6 py-3">User Region</th>
                    <th className="px-6 py-3">User Timezone</th>
                  </tr>
                </thead>
                <tbody>
                  {geoDataList.map((geoData, index) => (
                    <tr key={index}>
                      <td className="px-6 py-3">{geoData.city}</td>
                      <td className="px-6 py-3">{geoData.country}</td>
                      <td className="px-6 py-3">{geoData.ip}</td>
                      <td className="px-6 py-3">{geoData.loc}</td>
                      <td className="px-6 py-3">{geoData.org}</td>
                      <td className="px-6 py-3">{geoData.postal}</td>
                      <td className="px-6 py-3">{geoData.region}</td>
                      <td className="px-6 py-3">{geoData.timezone}</td>
                      <td className="px-6 py-3">{geoData.user_city}</td>
                      <td className="px-6 py-3">{geoData.user_country}</td>
                      <td className="px-6 py-3">{geoData.user_ip}</td>
                      <td className="px-6 py-3">{geoData.user_loc}</td>
                      <td className="px-6 py-3">{geoData.user_org}</td>
                      <td className="px-6 py-3">{geoData.user_postal}</td>
                      <td className="px-6 py-3">{geoData.user_region}</td>
                      <td className="px-6 py-3">{geoData.user_timezone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Home;
