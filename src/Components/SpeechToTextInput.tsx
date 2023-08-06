import { Input } from 'antd';
import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}


const SpeechToTextInput = () => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    setIsListening(true);
    const recognition = new window.webkitSpeechRecognition(); // Initialize SpeechRecognition API
    recognition.lang = 'en-US'; // Set language to English
    recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.start();
  };

  return (
    <Input width={"100%"} suffix={<FaMicrophone onClick={startListening} />} value={inputText} onChange={(e) => { setInputText(e.target.value) }} />
  );
};

export default SpeechToTextInput;
