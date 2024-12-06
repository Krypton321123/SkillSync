import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "react-toastify";

const RoomCard = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate(); // Use the navigate hook to navigate to different routes
  const toast = useToast(); // Initialize the toast hook
  const handleNavigation = () => {
    window.location.href = 'https://www.example.com'; // External navigation
};


const handleStartMeeting = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  alert(`Meeting started by ${name}!`);
  try {
    const response = await axios.post(
      'http://localhost:8000/api/v1/room' // Fixed the double `/api/v1/`
    );
    
    const joinUrl = response.data.join_url; // Assuming your backend sends `join_url` in `data`

    console.log(response);
    if (joinUrl) {
      toast({
        title: `Meeting started at: ${joinUrl}`,
        status: 'success',
        isClosable: true,
      });

      // Redirecting to the meeting room (internal or external link)
      window.location.href = joinUrl; // Or use navigate(joinUrl) for internal routes
    }
  } catch (error) {
    console.log('Error in creating the meeting room:', error);
    toast({
      title: 'Error in creating the meeting room!',
      description: error.response?.data?.message || 'Something went wrong.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }
};


  return (
    <div className="bg-black text-purple-400 p-6 rounded-lg max-w-lg h-screen mx-auto shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Schedule a Meeting</h1>
      <p className="text-purple-300 mb-6">
        Plan your meetings effortlessly! Enter your name and start the meeting with one click.
      </p>
      <form onSubmit={handleStartMeeting} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-purple-300 text-sm font-medium mb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-gray-800 text-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition duration-200"
        >
          Start Meeting
        </button>
      </form>
      <div className="mt-2">
        <img
          src="/meeting.png"
          alt="Meeting Background"
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
  );
};

export default RoomCard;
