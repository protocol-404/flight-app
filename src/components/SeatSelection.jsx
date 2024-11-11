// SeatSelection.jsx
import React, { useState } from 'react';

const SeatSelection = ({ onSeatSelect }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatChange = (e) => {
    const seat = e.target.value;
    setSelectedSeat(seat);
    onSeatSelect(seat);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Select Your Seat</h2>
      <div className="space-y-2">
        <label className="block">
          <input
            type="radio"
            name="seat"
            value="Window"
            checked={selectedSeat === "Window"}
            onChange={handleSeatChange}
            className="mr-2"
          />
          Window Seat
        </label>
        <label className="block">
          <input
            type="radio"
            name="seat"
            value="Aisle"
            checked={selectedSeat === "Aisle"}
            onChange={handleSeatChange}
            className="mr-2"
          />
          Aisle Seat
        </label>
        <label className="block">
          <input
            type="radio"
            name="seat"
            value="Middle"
            checked={selectedSeat === "Middle"}
            onChange={handleSeatChange}
            className="mr-2"
          />
          Middle Seat
        </label>
      </div>
    </div>
  );
};

export default SeatSelection;
