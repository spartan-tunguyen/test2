import React, { useState } from "react";
import "../style/ChatBot.css";
import axios from "axios";
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi I'm Ellie, your personal AI Assistant! How can I help you?",
      type: "ai",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 750);
    } else {
      setIsOpen(true);
    }
  };

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { type: 'user', text: inputValue }];
      setMessages(newMessages);
      console.log('newMessages:', newMessages);
      setInputValue('');
      console.log('input:', inputValue);
      // Simulate bot response
      // setTimeout(() => {
      //   const botMessage = { sender: 'Bot', text: `You said: ${input}` };
      //   setMessages([...newMessages, botMessage]);
      // }, 500);

      // Send message to bot
      const response = await axios({
        method: 'POST',
        url: `http://localhost:9000/routes/chat`,
        data: { text: inputValue },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      const botMessage = { type: "ai", text: response.data.response };
      setMessages([...newMessages, botMessage]);

    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`chat-bot ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <button
          className={`chat-button ${isAnimating ? "hidden" : ""}`}
          onClick={toggleChat}
        ></button>
      )}
      {isOpen && (
        <div className={`chat-window ${isAnimating ? "hidden" : ""}`}>
          <div className="chat-header">
            <h3>Ellie</h3>
            <button onClick={toggleChat}>X</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.type}`}>
                {msg.type === "ai" && (
                  <img
                    src="https://img.freepik.com/premium-vector/cute-robot-waving-hand-cartoon-illustration_138676-2744.jpg?w=900"
                    alt="AI"
                    className="profile-pic"
                  />
                )}
                <div
                  className={`message-box ${
                    msg.type === "user" ? "user-message" : "ai-message"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <textarea
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="1"
            ></textarea>
            <button className="send-button" onClick={handleSend}></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
