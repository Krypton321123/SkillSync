import React from "react";

const Dashboard = () => {
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

    return (
        <div className="p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">Your Feed</h1>
            <div className="flex flex-col items-center space-y-6">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="w-1/2 bg-white shadow-md rounded-md p-4 space-y-3"
                    >
                        <h3 className="font-bold">{post.user}</h3>
                        <img
                            src={post.imageURL}
                            alt="Post"
                            className="w-full h-auto rounded-md"
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
    );
};

export default Dashboard;