import React, { useState } from "react";
import axios from "axios";

const CreateCommunity = () => {
    // State for form inputs
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!name || !description) {
            setError("Both fields are required!");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setMessage(null);

            const response = await axios.post(`http://localhost:8000/api/v1/community/createCommunity`, {name, description});


            if (response.status !== 200) {
                setError(response.data.data.message || "Something went wrong");
            } else {
                setMessage("Community created successfully!");
                setName("");
                setDescription("");
            }
        } catch (err) {
            setError("Failed to create the community. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Create a Community</h1>

                {error && <p className="text-red-600 mb-4">{error}</p>}
                {message && <p className="text-green-600 mb-4">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium">
                            Community Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                            placeholder="Enter community name"
                        />
                    </div>


                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium">
                            Community Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                            rows="4"
                            placeholder="Describe your community"
                        ></textarea>
                    </div>


                    <div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 text-white rounded-md ${
                                loading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Community"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCommunity;