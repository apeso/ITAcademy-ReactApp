import React, { useState } from 'react';
import '../style/Asistent.css';

const Asistent = () => {
  const [messages, setMessages] = useState([{sender:'bot', text:"Hi! How I can help you today?"}]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    setInput('');

    const response = await getChatbotResponse(input);
    const botMessage = { sender: 'bot', text: response };

    setMessages([...messages, userMessage, botMessage]);
  };

  const getChatbotResponse = async (message) => {
    const url = 'http://127.0.0.1:5000/process_data';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), 
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.message; // Assuming your server returns a JSON object with a 'message' property
    } catch (error) {
      console.error('Error fetching data:', error);
      return 'Sorry, there was an error processing your request. Please try again later.';
    }
  };
  

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-info">
        <img src="https://i.pinimg.com/originals/9a/11/33/9a1133d4af3b637e1c6c8ff251785f27.jpg" alt="Assistant" className="chatbot-image" />
        <div className="chatbot-text">
          <h1 className="chatbot-title">Virtual Assistant</h1>
          <p className="chatbot-description">
            Whether you're looking to enhance your skills, dive into a new hobby, or master a craft, I'm here to make your journey smooth and exciting. Let's find your perfect workshop together!
          </p>
        </div>
      </div>
      <div className="chatbot-container">
        <div className="chatbot-header">Chat Assistant</div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chatbot-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Asistent;
