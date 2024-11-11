// FlightSearchForm.jsx
import React, { useState } from 'react';

const FlightSearchForm = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ from, to });
  };

  return (
    <form onSubmit={handleSearch} className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Flight Search</h2>
      <div>
        <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
        <input
          type="text"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
        <input
          type="text"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        Search Flights
      </button>
    </form>
  );
};

export default FlightSearchForm;
