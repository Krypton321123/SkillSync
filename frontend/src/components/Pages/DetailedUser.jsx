import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailedUserPage = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const response = await axios.get(`http://localhost:8000/api/v1/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setUserData(response.data.data.user);


                const currentUserId = response.data.data.currentUserId;
                console.log(currentUserId)
                setIsFollowing(response.data.data.user.followerList.includes(currentUserId));

                setLoading(false);
            } catch (err) {
                console.error("Error fetching user details:", err);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);


    const toggleFollow = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            await axios.post(
                `http://localhost:8000/api/v1/user/togglefollow`,
                { targetUserId: id },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setIsFollowing((prevState) => !prevState);
        } catch (err) {
            console.error("Error toggling follow:", err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6 w-full h-screen">
            <h1 className="text-2xl font-bold">
                {userData.first_name} {userData.last_name}
            </h1>
            <p className="text-gray-600">
                {userData.followerList.length} Followers | {userData.followingList.length} Following
            </p>
            <button
                onClick={toggleFollow}
                className={`mt-4 px-4 py-2 rounded ${
                    isFollowing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                }`}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </button>
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Joined Communities</h2>
                <ul className="list-disc pl-6">
                    {userData.joinedCommunities.map((community) => (
                        <li key={community._id}>{community.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DetailedUserPage;