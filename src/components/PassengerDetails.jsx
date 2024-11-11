// PassengerDetails.jsx
import React, { useState } from 'react';

const PassengerDetails = ({ onPassengerDetailsSubmit }) => {
  const [name, setName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPassengerDetailsSubmit({ name, passportNumber });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Passenger Details</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Passport Number</label>
        <input
          type="text"
          value={passportNumber}
          onChange={(e) => setPassportNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        Submit Details
      </button>
    </form>
  );
};

export default PassengerDetails;
