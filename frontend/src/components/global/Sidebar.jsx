import React, { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken) {
                    return; // No token available, handle accordingly
                }

                const response = await axios.get("http://localhost:8000/api/v1/user/profile", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setUserData(response.data.data);

                setLoading(false);
                console.log(userData)
            } catch (err) {
                console.error("Error fetching user data:", err);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    return (
        <div className="flex h-full">
            <div
                className={`${
                    isSidebarOpen ? "w-1/5" : "w-16"
                } bg-gray-800 text-white transition-all duration-300`}
            >
                <div className="flex items-center justify-between p-4">
                    <h1
                        className={`text-xl font-bold ${
                            isSidebarOpen ? "block" : "hidden"
                        }`}
                    >
                        Dashboard
                    </h1>
                    <button
                        className="text-white"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
                        <div className='flex'>
                        <h2 className="font-bold">{userData.firstName}&nbsp;</h2>
                        <h2 className="font-bold">{userData.lastName}</h2>
                        </div>
                        <p className="text-sm">
                            {userData.followers} Followers | {userData.following} Following
                        </p>
                        <a href="/updateProfile">
                            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md">
                                Update Profile
                            </button>
                        </a>
                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md">
                            View Followers/Following
                        </button>
                        <div>
                            <h3 className="font-bold text-lg mb-2">Joined Communities</h3>
                            <ul className="space-y-2">
                                {userData.joinedCommunities.map((community) => (
                                    <li
                                        key={community.id}
                                        className="bg-gray-700 p-2 rounded-md hover:bg-gray-600"
                                    >
                                        {community.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Children content area */}
            <div className="flex-grow bg-gray-100">{children}</div>
        </div>
    );
};

export default Sidebar;