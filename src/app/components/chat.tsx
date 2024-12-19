/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Header from "../components/nav";

type ChatMessage = {
  role: "user" | "bot"; // Role of the message sender
  content: string; // The actual message content
};

const arrowUp = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
  </svg>
);

export default function ChatBot() {
  const [userMessage, setUserMessage] = useState(""); // User's input
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // Stores the entire chat history
  const [loading, setLoading] = useState(false); // Loading state

  const handleSendMessage = async () => {
    if (!userMessage) return;

    setLoading(true);

    try {
      const response = await fetch("../api/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-4o", // Model to use
          messages: [{ role: "user", content: userMessage }],
          stream: false,
        }),
      });

      const data = await response.json();

      console.log("API Response:", data); // Log API response

      if (response.ok) {
        const botMessage = data.choices?.[0]?.message?.content || "No response found";

        // Append user and bot messages to the chat history
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "user", content: userMessage },
          { role: "bot", content: botMessage },
        ]);

        // Clear user input
        setUserMessage("");
      } else {
        console.error("Error Response:", data);
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <Header />
        <div className="flex flex-col justify-end overflow-x-hidden items-center w-full">
          <div className="w-2/3 m-8 flex flex-col gap-6 overflow-y-auto ">
            {/* Display Chat History */}
            <div className="w-full rounded-2xl flex flex-col justify-end p-4 ">
              {chatHistory.length > 0 ? (
                chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`p-2 flex flex-col gap-3  ${
                      message.role === "user" ? "text-blue-400 text-right bg-slate-600" : "text-white text-left"
                    }`}
                  >
                    {message.content}
                  </div>
                ))
              ) : (
                <p className="text-white">Start chatting with GalantAI!</p>
              )}
            </div>

            {/* Input and Send Button */}
            <div className="p-6 flex gap-4 flex-col rounded-2xl bg-slate-600">
              <div className="flex-1 sticky bottom-0">
                <input
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Message GalantAI"
                  className="text-white w-full h-8 border-none p-4 bg-transparent focus:outline-none focus:border-none"
                ></input>
              </div>
              <div className="flex justify-end">
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
  );
}
