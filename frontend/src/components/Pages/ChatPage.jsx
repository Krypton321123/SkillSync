import React, { useState, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { activeChatUserAtom, chatHistoryAtom } from "../../store/atoms/chatAtoms";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const ChatPage = () => {
    const [chatHistory, setChatHistory] = useRecoilState(chatHistoryAtom);
    const [activeChatUser, setActiveChatUser] = useRecoilState(activeChatUserAtom);
    const [message, setMessage] = useState("");
    const socket = useMemo(
        () =>
            io("http://localhost:8000", {
                auth: {
                    token: localStorage.getItem("accessToken")
                }
            }),
        []
    );
    const navigate = useNavigate();


    useEffect(() => {
        const fetchChatHistory = async () => {
            if (!activeChatUser) return;

            const accessToken = localStorage.getItem("accessToken");
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/chat/history/${activeChatUser}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setChatHistory(response.data.messages);
                console.log(response)
            } catch (err) {
                console.error("Error fetching chat history:", err);
            }
        };

        fetchChatHistory();


        if (socket) {
            socket.on("message", (newMessage) => {
                if (newMessage.receiverId === activeChatUser || newMessage.senderId === activeChatUser) {
                    setChatHistory((prevHistory) => [...prevHistory, newMessage]); // Add new message to chat history
                }
            });
        }


        return () => {
            if (socket) {
                socket.off("message");
            }
        };
    }, [activeChatUser, socket, setChatHistory]);


    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };


    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/chat/send",
                { receiverId: activeChatUser, content: message },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (socket) {
                socket.emit("message", response.data.message);
            }


            setChatHistory((prevHistory) => [
                ...prevHistory,
                { ...response.data.message, senderId: response.data.message.senderId, content: message },
            ]);

            setMessage("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-grow p-4 flex flex-col">

                <div className="flex-grow overflow-y-auto mb-4">
                    <div className="space-y-4">
                        {chatHistory.length > 0 ? (
                            chatHistory.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex h-full ${
                                        msg.senderId === activeChatUser
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-xs px-4 py-2 rounded-lg ${
                                            msg.senderId === activeChatUser
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-300 text-black"
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">No messages yet</div>
                        )}
                    </div>
                </div>


                <div className="w-full h-full flex items-center mt-4 space-x-2">
                    <input
                        type="text"
                        className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Type a message"
                        value={message}
                        onChange={handleMessageChange}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;