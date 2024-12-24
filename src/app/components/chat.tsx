"use client"
/* eslint-disable @next/next/no-img-element */
// eslint-disable react/no-unescaped-entities 
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useState } from "react";
import Header from "../components/nav";
import Models from './models';
import { useSession, signIn } from "next-auth/react";

type ChatMessage = {
  role: "user" | "bot" // Role of the message sender
  content: string; // The actual message content
};

const arrowUp = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
  </svg>
);

export default function ChatBot() {
  const { data: session } = useSession();
  const [userMessage, setUserMessage] = useState(""); // User's input
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // Stores the entire chat history
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedModel, setSelectedModel] = useState("gpt-4o"); // Default model

  const handleSendMessage = async () => {
    if (!session) {
      signIn();
      return;
    }

    if (!userMessage) return;
    
    console.log(`Selected Model ${selectedModel}`)
    setLoading(true);

    // Immediately add user message to chat history
    setChatHistory(prevHistory => [...prevHistory, { role: "user", content: userMessage }]);
    
    // Clear user input immediately
    setUserMessage("");

    try {
      const response = await fetch("/api/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: userMessage }],
          model: selectedModel,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = data.choices?.[0]?.message?.content || "No response found"
        
        // Add only the bot's message to chat history
        setChatHistory(prevHistory => [...prevHistory, { role: "bot", content: botMessage }]);
      } else {
        console.error("Response:", data)
        // Add error message to chat
        setChatHistory(prevHistory => [...prevHistory, { role: "bot", content: "Sorry, I encountered an error. Please try again." }]);
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error)
      // Add error message to chat
      setChatHistory(prevHistory => [...prevHistory, { role: "bot", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
        <h1 className="text-2xl font-bold text-white mb-4">Please sign in to use the chat</h1>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        {/* Header Area */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-700">
          <Header />
          {/* Model Selection Dropdown */}
          <Models value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} />
        </div>
        <div className="flex flex-col justify-end overflow-x-hidden items-center ">
          <div className="w-2/3 py-2 flex flex-col gap-6 overflow-y-auto ">
            {/* Display Chat History */}
              <div className={`w-full rounded-2xl flex flex-col p-4 gap-4 items-end 
              `}>
                {chatHistory.length > 0 ? (
                  chatHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`${
                        message.role === "user"
                          ? "text-white bg-slate-600 rounded-lg py-4 px-4 max-w-[66%] w-fit "
                          : "text-white text-left py-4 px-4 w-full"
                      }`}
                    >
                      <div>
                        {message.role === "user" ? (
                          <div className="">
                              <div className="text-white">{message.content}</div>
                          </div>
                        ) : (
                          <div className="">
                              <ReactMarkdown className="text-white">{message.content}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p></p>
                )}
              </div>

            {/* Input and Send Button */}
            <div className=" flex flex-col rounded-2xl bg-slate-600 sticky bottom-0 w-full">
              <div className="flex-1">
              <textarea
                  value={userMessage}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      handleSendMessage();
                    }
                  }}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Message GalantAI"
                  className="text-white w-full h-10 border-none pt-4 px-6 bg-transparent focus:outline-none focus:border-none resize-none"
                />
              </div>
              <div className="flex justify-end pb-2 px-4">
                <button
                  onClick={handleSendMessage}
                  disabled={loading}
                  className="bg-white text-black rounded-full w-8 h-8 justify-items-center"
                >
                  {loading ? <img src="/spinner.svg" alt="Loading" /> : arrowUp}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
