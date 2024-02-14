import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3001");

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChat([...chat, msg]);
    });
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat message', message);
    setMessage('');
  };

  return (
    <div>
      <ul>
        {chat.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;