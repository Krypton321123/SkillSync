import React from 'react';

const CreateModal = ({ isVisible, closeModal, onCreateCommunity, onCreatePost }) => {
    if (!isVisible) return null; // Return nothing if modal is not visible

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-bold mb-4">Create Something</h3>
                <button
                    onClick={onCreateCommunity}
                    className="w-full mb-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Create a Community
                </button>
                <button
                    onClick={onCreatePost}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Create a Post
                </button>
                <button
                    onClick={closeModal}
                    className="w-full mt-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CreateModal;