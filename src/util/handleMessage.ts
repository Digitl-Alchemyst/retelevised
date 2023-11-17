'use client';

import { useState, useEffect } from 'react';
import '../../typings.d.ts';

function useMessageHandling() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const handleMessage = (event, message) => setMessage(message);
    window.electron.message.on(handleMessage);
    return () => {
      window.electron.message.off(handleMessage);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    window.electron.message.send(input);
    setMessage(null);
  };

  return {
    input,
    setInput,
    message,
    handleSubmit,
  };
}


export default useMessageHandling;