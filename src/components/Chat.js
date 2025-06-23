import React, { useState } from 'react';
import '../style/chat.css';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');



  const handleSend = async () => {
    
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'User', text: input }];
      setMessages(newMessages);
      setInput('');
      console.log('input:', input);
      // Simulate bot response
      // setTimeout(() => {
      //   const botMessage = { sender: 'Bot', text: `You said: ${input}` };
      //   setMessages([...newMessages, botMessage]);
      // }, 500);

      // Send message to bot
      const response = await axios({
        method: 'POST',
        url: `http://localhost:9000/routes/chat`,
        data: { text: input },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      const botMessage = { sender: 'Bot', text: response.data.response };
      setMessages([...newMessages, botMessage]);

    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat Interface</div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender.toLowerCase()}`}>
            <div className="message-box">
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}


export default Chat;
