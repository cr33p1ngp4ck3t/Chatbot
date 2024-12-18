"use client";
import { useState } from "react";

export default function Home() {
  const [userMessage, setUserMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userMessage) return;
  
    setLoading(true);
    setChatResponse(""); // Clear previous response
  
    try {
      const response = await fetch("/api/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-4o", // Model to use
          messages: [
            {'role': 'system',
            'content': "You are ChatGPT, a large language model trained by OpenAI.\nCarefully heed the user's instructions. \nRespond using Markdown."},
            { role: "user", content: userMessage }
          ],
          stream: true,
        }),
      });
  
      const data = await response.json();
  
      console.log("API Response:", data); 

      if (response.ok) {
        const botMessage = data.choices?.[0]?.message?.content || "No response found";
        setChatResponse(botMessage);
      } else {
        setChatResponse(`Error: ${data.error || "Failed to fetch response"}`);
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setChatResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col justify-end w-screen h-screen overflow-hidden content-center text-center">
      <div>
        <p>{chatResponse}</p>
      </div>
      <div className="p-6 flex gap-4">
        <div className="flex-1">
          <input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message here..."
            className="text-black w-full h-16 border-none"
          ></input>
        </div>
        <button onClick={handleSendMessage} disabled={loading} 
        className="bg-white text-black border-slate-400 border-2 h-16 p-4">
          {loading ? "Loading..." : "Send Message"}
        </button>
      </div>
    </div>
  );
}
