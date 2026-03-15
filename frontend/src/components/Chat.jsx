import { useRef, useState } from "react";
import MessageList from "./MessageList";

const Chat = () => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const messageInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const prompt = messageInputRef.current.value.trim();
    if (!prompt) return;

    setLoading(true);

    let url = "http://localhost:3000/api/conversation";

    if (conversation) {
      url = `${url}/${conversation._id}`;
    }

    fetch(url, {
      method: conversation ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((conversation) => {
        setConversation(conversation);
        messageInputRef.current.value = "";
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg">

        {/* Header */}
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {conversation?.title || "Chat with AI"}
          </h2>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setConversation(null)}
          >
            New Chat
          </button>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
          <MessageList conversation={conversation} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex gap-2">

            <input
              type="text"
              placeholder="Type your message here..."
              ref={messageInputRef}
              disabled={loading}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              {loading ? "Sending..." : "Send"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Chat;