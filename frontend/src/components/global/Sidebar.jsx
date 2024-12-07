import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { activeChatUserAtom, chatHistoryAtom } from "../../store/atoms/chatAtoms.js";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const setActiveChatUser = useSetRecoilState(activeChatUserAtom);
    const setChatHistory = useSetRecoilState(chatHistoryAtom);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                return;
            }

            try {
                const response = await axios.get("http://localhost:8000/api/v1/user/profile", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log(response.data.data)

                setUserData(response.data.data);

                setLoading(false);

            } catch (err) {
                console.error("Error fetching user data:", err);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);


    const fetchChatHistory = async (userId) => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/chat/history/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setChatHistory(response.data.messages);
        } catch (err) {
            console.error("Error fetching chat history:", err);
        }
    };

    const handleUserClick = (userId) => {
        setActiveChatUser(userId);
        fetchChatHistory(userId);
        navigate("/chat");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-full">
            <div
                className={`${
                    isSidebarOpen ? "w-1/5" : "w-16"
                } bg-gray-800 text-white transition-all duration-300`}
            >
                <div className="flex items-center justify-between p-4">
                    <h1 className={`text-xl font-bold ${isSidebarOpen ? "block" : "hidden"}`}>Dashboard</h1>
                    <button
                        className="text-white"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar
                    >
                        {isSidebarOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {isSidebarOpen && userData && (
                    <div className="p-4 space-y-4">
                        <div className="flex">
                            <h2 className="font-bold">{userData.firstName} {userData.lastName}</h2>
                        </div>
                        <p className="text-sm mb-4">
                            {userData.followers.length} Followers | {userData.following.length} Following
                        </p>
                        <a href="/updateProfile" className="mt-3">
                            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md">Update Profile</button>
                        </a>
                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md">
                            View Followers/Following
                        </button>


                        <button
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                            onClick={async () => {
                                try {
                                    const accessToken = localStorage.getItem("accessToken");
                                    const response = await axios.post(
                                        "http://localhost:8000/api/v1/room/meeting",
                                        {},
                                        {
                                            headers: {
                                                Authorization: `Bearer ${accessToken}`,
                                            },
                                        }
                                    );

                                    const meetingDetails = response.data.meetingDetails;
                                    navigate("/room", { state: { meetingDetails } });
                                } catch (err) {
                                    console.error("Error creating meeting:", err);
                                    alert("Failed to create meeting. Please try again.");
                                }
                            }}
                        >
                            Create Room
                        </button>


                        <div>
                            <h3 className="font-bold text-lg mb-2">Users</h3>
                            <ul className="space-y-2">

                                {userData.following && userData.following.length > 0 ? (
                                    userData.following.map((user) => (
                                        <li
                                            key={user._id}
                                            className="bg-gray-700 p-2 rounded-md hover:bg-gray-600 cursor-pointer"
                                            onClick={() => handleUserClick(user._id)}
                                        >

                                            {user.first_name} {user.last_name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No following users</li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-grow bg-gray-100">{children}</div>
        </div>
    );
};

export default Sidebar;