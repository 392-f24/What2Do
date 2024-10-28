import React from "react";
import mapImage from "../assets/Maps.png";
import { Link, useLocation } from "react-router-dom";

export const MapView = () => {
  const location = useLocation();
  const selectedActivities = location.state?.selectedOptions || [];

  return (
    <div className="p-8 space-y-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800">Trip Map</h1>


      {/*Map-static for now*/}
      <div className="bg-gray-200 h-96 rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
        <img
          src={mapImage}
          alt="Map Placeholder"
          className="object-cover w-full h-full"
        />
      </div>


      {/*Back button */}
      <div className="flex justify-center">
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
        >
          Back to Trips
        </Link>
      </div>



      {/* Activity List */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Map Page</h2>

        <div className="space-y-4">
          {selectedActivities.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                {item.activity}
              </h3>
              <ul className="ml-4 list-disc list-inside text-gray-600">
                {item.selectedOptions.map((option, optIndex) => (
                  <li key={optIndex} className="text-sm">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
