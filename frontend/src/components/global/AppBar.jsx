import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '../../store/atoms/loginAtom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateModal from "../ModalComponents/CreateModal.jsx"; // Import the Modal component

const AppBar = ({ children }) => {
    const navigate = useNavigate();
    const loggedIn = useRecoilValue(loginAtom);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);


    const [isModalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        if (searchQuery.trim()) {
            const fetchCommunities = async () => {
                try {
                    const response = await axios.post(`http://localhost:8000/api/v1/user/getSearch`, { value: searchQuery });
                    if (response.data.status === 200) {
                        setSearchResults(response.data.data);
                    } else {
                        setSearchResults([]);
                    }
                    setIsDropdownVisible(true);
                } catch (err) {
                    console.error('Error fetching communities:', err);
                    setSearchResults([]);
                }
            };

            const debounceTimeout = setTimeout(fetchCommunities, 300); // Debounce
            return () => clearTimeout(debounceTimeout);
        } else {
            setSearchResults([]);
            setIsDropdownVisible(false);
        }
    }, [searchQuery]);


    const handleCreateClick = () => {
        setModalVisible(true);
    };


    const closeModal = () => {
        setModalVisible(false);
    };


    const handleCreateCommunity = () => {
        navigate('/createCommunity');
        closeModal();
    };


    const handleCreatePost = () => {
        navigate('/createPost');
        closeModal();
    };

    return (
        <>
            <div className="w-full h-16 border-y-2 flex justify-between items-center">
                <div className="logo">
                    <button className="text-xl whitespace-nowrap px-2" onClick={() => navigate('/')}>
                        SkillSync
                    </button>
                </div>
                <div className="relative search hidden md:flex lg:flex justify-start items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-3 icon icon-tabler icons-tabler-outline icon-tabler-search"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                    <input
                        type="text"
                        className="searchbar bg-gray-200 rounded-3xl w-72 px-4 py-2 hover:opacity-70 focus:opacity-70"
                        placeholder="Search anything..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {isDropdownVisible && (
                        <div className="absolute top-12 left-0 w-72 bg-white shadow-lg rounded-lg z-10">
                            <h4 className="font-bold px-4">Communities</h4>
                            {searchResults.communities.map((community) => (
                                <div
                                    key={community._id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => navigate(`/detailedcommunity/${community._id}`)}
                                >
                                    {community.name}
                                </div>
                            ))}
                            <h4 className="font-bold px-4 mt-2">Users</h4>
                            {searchResults.users.map((user) => (
                                <div
                                    key={user._id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => navigate(`/user/${user._id}`)}
                                >
                                    {user.first_name} {user.last_name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="buttons">

                        <>
                            <button
                                onClick={handleCreateClick} // Open modal on "Create" click
                                className="whitespace-nowrap font-semibold w-16 p-2 hover:bg-gray-300 rounded-3xl"
                            >
                                Create
                            </button>
                        </>

                </div>
            </div>


            <CreateModal
                isVisible={isModalVisible}
                closeModal={closeModal}
                onCreateCommunity={handleCreateCommunity}
                onCreatePost={handleCreatePost}
            />

            {children}
        </>
    );
};

export default AppBar;