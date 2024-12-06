import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CommunityPage = () => {
    const { id } = useParams(); // Community ID from URL
    const [community, setCommunity] = useState(null);
    const [isMember, setIsMember] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch community details
    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const response = await axios.get(`http://localhost:8000/api/v1/community/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setCommunity(response.data.data.community);
                console.log(community)

                // Check if the current user is a member
                const userId = response.data.data.currentUserId; // Get current user ID from response
                console.log(userId)
                setIsMember(response.data.data.community.members.some((m) => m._id === userId));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching community details:", err);
            }
        };

        fetchCommunity();
    }, [id]);

    // Handle Join/Leave
    const handleMembershipToggle = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.post(
                `http://localhost:8000/api/v1/community/${id}/toggle-membership`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setIsMember((prevState) => !prevState);
        } catch (err) {
            console.error("Error toggling membership:", err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4 h-screen">
            <h1 className="text-2xl font-bold">{community.name}</h1>
            <p className="text-gray-600">{community.description}</p>
            <div className="mt-4">
                <button
                    onClick={handleMembershipToggle}
                    className={`px-4 py-2 rounded ${
                        isMember ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                    }`}
                >
                    {isMember ? "Leave Community" : "Join Community"}
                </button>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Posts</h2>
                {community.posts.length > 0 ? (
                    community.posts.map((post) => (
                        <div key={post._id} className="p-4 border-b">
                            <h3 className="font-bold">{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts yet.</p>
                )}
            </div>
        </div>
    );
};

export default CommunityPage;