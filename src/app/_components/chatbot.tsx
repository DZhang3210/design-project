"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CHATBOT_BACKEND_URL = process.env.NEXT_PUBLIC_CHATBOT_BACKEND_URL || "http://127.0.0.1:5001";
console.log(CHATBOT_BACKEND_URL)

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(true); // Controls whether the chatbot is open
  const [messages, setMessages] = useState([
    { text: "Welcome! Please enter your email to get started.", isBot: true },
  ]);
  const [userInput, setUserInput] = useState("");
  const chatbotRef = useRef<HTMLDivElement>(null); // Ref for chatbot container

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [
      ...messages,
      { text: userInput, isBot: false },
    ];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        `${CHATBOT_BACKEND_URL}/chat`,
        { message: userInput },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response)
      setMessages([
        ...newMessages,
        { text: response.data.message, isBot: true },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { text: "Sorry, something went wrong. Please try again.", isBot: true },
      ]);
    }

    setUserInput("");
  };

  // Close the chatbot when clicking outside or the close button
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) {
    // Minimized chatbot bubble
    return (
      <div
        className="fixed bottom-10 right-12 z-50 w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        Chat
      </div>
    );
  }

  return (
    <div
      ref={chatbotRef}
      className="fixed bottom-4 right-4 z-50 bg-gray-100 rounded-lg shadow-lg w-80"
    >
      <div className="flex flex-col h-96 p-4 overflow-hidden">
        {/* Chatbot Header */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-black text-lg font-bold">MedConnect</h3>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.isBot
                  ? "text-white bg-blue-500 self-start"
                  : "text-black bg-gray-200 self-end"
              } px-4 py-2 rounded-lg max-w-[70%]`}
              dangerouslySetInnerHTML={{
                __html: msg.text.replace(/\n/g, "<br />"),
              }}
            >
              {/* {msg.text} */}
            </div>
          ))}
        </div>
        {/* Chat Input */}
        <div className="flex items-center mt-2">
          <input
            className="text-black flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

