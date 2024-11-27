import React, { useState } from "react";

const Dashboard = () => {
   
    const user = {
        name: "John Doe",
        profilePicture: "https://via.placeholder.com/50",
        followers: 120,
        following: 85,
        joinedCommunities: [
            { id: 1, name: "Web Developers" },
            { id: 2, name: "React Enthusiasts" },
            { id: 3, name: "TailwindCSS Lovers" },
        ],
    };

    const posts = [
        {
            id: 1,
            user: "Jane Smith",
            title: "Understanding React Hooks",
            description: "A deep dive into useState and useEffect hooks.",
            imageURL: "https://via.placeholder.com/400",
            likes: 42,
            dislikes: 3,
        },
        {
            id: 2,
            user: "John Doe",
            title: "Mastering TailwindCSS",
            description: "Tips and tricks for efficient Tailwind development.",
            imageURL: "https://via.placeholder.com/400",
            likes: 58,
            dislikes: 1,
        },
    ];

   
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen">
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
                        {isSidebarOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                            </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>
                        }
                    </button>
                </div>

                {isSidebarOpen && (
                    <div className="p-4 space-y-4">
                                                <div className="flex items-center space-x-3">
                            <img
                                src={user.profilePicture}
                                alt="Profile"
                                className="rounded-full w-12 h-12"
                            />
                            <div>
                                <h2 className="font-bold">{user.name}</h2>
                                <p className="text-sm">
                                    {user.followers} Followers | {user.following} Following
                                </p>
                            </div>
                        </div>

                                                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md">
                            Update Profile
                        </button>
                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md">
                            View Followers/Following
                        </button>

                                                <div>
                            <h3 className="font-bold text-lg mb-2">Joined Communities</h3>
                            <ul className="space-y-2">
                                {user.joinedCommunities.map((community) => (
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

            <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Your Feed</h1>
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white shadow-md rounded-md p-4 space-y-3 block"
                        >
                            <div className="flex items-center space-x-3">
                                <h3 className="font-bold">{post.user}</h3>
                            </div>
                            <img
                                src={post.imageURL}
                                alt="Post"
                                className="w-[400px] h-[400px] rounded-md"
                            />
                            <h2 className="font-bold text-xl">{post.title}</h2>
                            <p>{post.description}</p>
                            <div className="flex items-center space-x-4">
                                <button className="text-blue-600 font-bold">Like</button>
                                <button className="text-red-600 font-bold">Dislike</button>
                                <button className="text-gray-600 font-bold">Comment</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;