import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '../../store/atoms/loginAtom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppBar = ({ children }) => {
    const navigate = useNavigate();
    const loggedIn = useRecoilValue(loginAtom);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // Fetch communities from backend
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

    return (
        <>
            <div className="w-full h-16 border-y-2 flex justify-between items-center">
                <div className="logo">
                    <span className="text-xl whitespace-nowrap px-2">SkillSync</span>
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
                            {searchResults.length > 0 ? (
                                searchResults.map((community) => (
                                    <div
                                        key={community._id}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            navigate(`/detailedcommunity/${community._id}`)
                                            setSearchQuery('')
                                        } }
                                    >
                                        {community.name}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-gray-500">No results found</div>
                            )}
                        </div>
                    )}
                </div>
                <div className="buttons">
                    {loggedIn === true ? (
                        <>
                            <button>Create</button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/signin');
                                }}
                                className="login font-semibold w-16 p-2 hover:bg-gray-300 rounded-3xl"
                            >
                                Login
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/signup');
                                }}
                                className="signup font-semibold mr-2 w-20 p-2 hover:bg-gray-300 rounded-3xl"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
            {children}
        </>
    );
};

export default AppBar;