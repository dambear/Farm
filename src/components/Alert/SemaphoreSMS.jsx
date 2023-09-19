import React, { useState } from 'react';
import axios from 'axios';

const SemaphoreSMS = () => {
  const [recipientNumber, setRecipientNumber] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3001/send-message', {
        number: recipientNumber,
        message,
      });

      if (response.status === 200) {
        console.log('Message sent successfully:', response.data);

        // Clear input fields
        setRecipientNumber('');
        setMessage('');
      } else {
        console.error('Error sending message. Status:', response.status);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-lg">
      <h1 className="text-2xl mb-4">Semaphore SMS</h1>
      <div className="mb-4">
        <label className="block mb-1">Recipient Number:</label>
        <input
          type="text"
          value={recipientNumber}
          onChange={(e) => setRecipientNumber(e.target.value)}
          className="w-full border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded py-2 px-3"
        ></textarea>
      </div>
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Send Message
      </button>
    </div>
  );
};

export default SemaphoreSMS;
