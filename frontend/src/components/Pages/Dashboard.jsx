import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            const accessToken = localStorage.getItem("accessToken");
            try {
                const response = await axios.get("http://localhost:8000/api/v1/user/fetchposts", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log(response)
                setPosts(response.data.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">Your Feed</h1>
            <div className="flex flex-col items-center space-y-6">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div
                            key={post._id}
                            className="w-1/2 bg-white shadow-md rounded-md p-4 space-y-3"
                        >
                            <h2 className="font-bold text-xl">{post.title}</h2>
                            <p>{post.description}</p>
                            <div className="flex items-center space-x-4">
                                <button className="text-blue-600 font-bold">Like</button>
                                <button className="text-red-600 font-bold">Dislike</button>
                                <button className="text-gray-600 font-bold">Comment</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;