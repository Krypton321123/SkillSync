import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RoomPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { meetingDetails } = location.state || {};

  if (!meetingDetails) {
    return (
        <div className="p-6">
          <h1 className="text-2xl font-bold">No Meeting Details Available</h1>
          <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Go Back
          </button>
        </div>
    );
  }

  return (
      <div className="p-6 w-full h-screen">
        <h1 className="text-2xl font-bold mb-4">Meeting Details</h1>
        <p className="mb-2">
          <strong>Topic:</strong> {meetingDetails.topic}
        </p>
        <p className="mb-2">
          <strong>Start Time:</strong> {new Date(meetingDetails.start_time).toLocaleString()}
        </p>
        <p className="mb-2">
          <strong>Duration:</strong> {meetingDetails.duration} minutes
        </p>
        <p className="mb-2">
          <strong>Meeting Link:</strong>{" "}
          <a href={meetingDetails.join_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {meetingDetails.join_url}
          </a>
        </p>
        <p className="mb-2">
          <strong>Password:</strong> {meetingDetails.password}
        </p>
        <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Go Back
        </button>
      </div>
  );
};

export default RoomPage;