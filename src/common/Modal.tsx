import React, { useState, useEffect } from "react";
import axios from "axios";

interface GeoData {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
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

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [geoDataList, setGeoDataList] = useState<GeoData[]>([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGeoDataList(response.data.data); // Update state with response data
    } catch (error) {
      console.error("Error fetching geo data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 shadow-lg rounded-lg p-6 z-100 bg-base-200">
      <button onClick={onClose} className="absolute top-2 right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M6.225 4.811a.75.75 0 0 1 1.06 0L12 9.525l4.715-4.714a.75.75 0 0 1 1.06 1.06L13.06 10.5l4.715 4.715a.75.75 0 0 1-1.06 1.06L12 11.56l-4.715 4.715a.75.75 0 0 1-1.06-1.06L10.94 10.5 6.225 5.785a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <h3 className="text-lg font-bold mb-2 flex justify-center z-50">
        History
      </h3>
      {geoDataList.length > 0 ? (
        <div className="overflow-auto max-h-96">
          <table className="table-auto mt-4 w-full border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="px-2 py-2">IP</th>
                <th className="px-2 py-2">City</th>
                <th className="px-2 py-2">Region</th>
                <th className="px-2 py-2">Country</th>
                <th className="px-2 py-2">Location</th>
                <th className="px-2 py-2">Organization</th>
                <th className="px-2 py-2">Postal</th>
                <th className="px-2 py-2">Timezone</th>
                <th className="px-2 py-2">User City</th>
                <th className="px-2 py-2">User Country</th>
                <th className="px-2 py-2">User IP</th>
                <th className="px-2 py-2">User Location</th>
                <th className="px-2 py-2">User Organization</th>
                <th className="px-2 py-2">User Postal</th>
                <th className="px-2 py-2">User Region</th>
                <th className="px-2 py-2">User Timezone</th>
              </tr>
            </thead>
            <tbody>
              {geoDataList.map((geoData, index) => (
                <tr key={index}>
                  <td className="px-2 py-2">{geoData.ip}</td>
                  <td className="px-2 py-2">{geoData.city}</td>
                  <td className="px-2 py-2">{geoData.region}</td>
                  <td className="px-2 py-2">{geoData.country}</td>
                  <td className="px-2 py-2">{geoData.loc}</td>
                  <td className="px-2 py-2">{geoData.org}</td>
                  <td className="px-2 py-2">{geoData.postal}</td>
                  <td className="px-2 py-2">{geoData.timezone}</td>
                  <td className="px-2 py-2">{geoData.user_city}</td>
                  <td className="px-2 py-2">{geoData.user_country}</td>
                  <td className="px-2 py-2">{geoData.user_ip}</td>
                  <td className="px-2 py-2">{geoData.user_loc}</td>
                  <td className="px-2 py-2">{geoData.user_org}</td>
                  <td className="px-2 py-2">{geoData.user_postal}</td>
                  <td className="px-2 py-2">{geoData.user_region}</td>
                  <td className="px-2 py-2">{geoData.user_timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Modal;
