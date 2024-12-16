// pages/index.js
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('');
  const [model, setModel] = useState('gpt-4o')
  const [rateLimitInfo, setRateLimitInfo] = useState({ minute: 5, day: 50 })

  const models = [
    { name: 'GPT-4o', key: 'gpt-4o', limits: { minute: 5, day: 50 } },
    { name: 'LLaMA 3.3 70B', key: 'llama-3.3-70b', limits: { minute: 10, day: 100 } },
    { name: 'LLaMA 3.2 90B', key: 'llama-3.2-90b', limits: { minute: 10, day: 100 } },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    try {
      const response = await fetch('https://api.nexusmind.tech/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer your_key',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: model,
          stream: false,
        }),
      });

      const data = await response.json();
      const botMessage = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white text-center">
        <h1 className="text-2xl font-bold">Chat with AI</h1>
      </div>
      
      {/* Model Selector */}
      <div className="p-4 bg-white border-b flex justify-between items-center">
        <select
          value={model}
          onChange={(e) => {
            const selectedModel = models.find(m => m.key === e.target.value);
            setModel(selectedModel.key);
            setRateLimitInfo(selectedModel.limits);
          }}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {models.map((m) => (
            <option key={m.key} value={m.key}>
              {m.name}
            </option>
          ))}
        </select>
        <div>
          <p className="text-sm text-gray-600">
            Minute: {rateLimitInfo.minute}, Day: {rateLimitInfo.day}
          </p>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg max-w-lg ${
              msg.role === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 text-gray-800 self-start'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
