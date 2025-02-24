// src/App.js

import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Import QRCodeSVG
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [qrValue, setQrValue] = useState('');
  const qrRef = useRef(); // Create a ref for the QR code

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGenerateQrCode = () => {
    setQrValue(inputValue);
  };

  const handleDownload = () => {
    const svg = qrRef.current.querySelector('svg');
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const base64 = btoa(unescape(encodeURIComponent(svgString)));
    const link = document.createElement('a');
    link.href = `data:image/svg+xml;base64,${base64}`;
    link.download = 'qrcode.svg'; // Set the filename for the download
    link.click();
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text or URL"
      />
      <button onClick={handleGenerateQrCode}>Generate QR Code</button>
      {qrValue && (
        <div>
          <h2>Your QR Code:</h2>
          <div ref={qrRef}>
            <QRCodeSVG value={qrValue} /> {/* Use QRCodeSVG here */}
          </div>
          <button onClick={handleDownload}>Download QR Code</button> {/* Download button */}
        </div>
      )}
    </div>
  );
}

export default App;
