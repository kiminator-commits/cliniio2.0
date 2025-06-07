import React from 'react';

const Notification = ({ notification, onClose }) => {
  if (!notification) return null;
  return (
    <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded mb-4">
      <span>{notification.message}</span>
      <button className="ml-4 text-blue-600 underline" onClick={onClose}>Close</button>
    </div>
  );
};

export default Notification; 