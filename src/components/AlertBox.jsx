import React from 'react';

const AlertBox = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 bg-white text-black border border-gray-300 rounded shadow-lg p-4 z-50 max-w-sm">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-gray-500 hover:text-red-500">✕</button>
      </div>
    </div>
  );
};

export default AlertBox;
