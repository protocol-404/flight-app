// TicketSummary.jsx
import React from 'react';

const TicketSummary = ({ selectedFlight, passengerDetails, selectedSeat }) => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Ticket Summary</h2>
      <div className="border p-4 rounded-md shadow-sm space-y-2">
        <h3 className="text-xl font-semibold">Flight Details</h3>
        <p><strong>From:</strong> {selectedFlight.from}</p>
        <p><strong>To:</strong> {selectedFlight.to}</p>
        <p><strong>Departure:</strong> {selectedFlight.departureTime}</p>
        <p><strong>Arrival:</strong> {selectedFlight.arrivalTime}</p>
        <p><strong>Price:</strong> {selectedFlight.price} DH</p>
      </div>
      <div className="border p-4 rounded-md shadow-sm space-y-2">
        <h3 className="text-xl font-semibold">Passenger Details</h3>
        <p><strong>Name:</strong> {passengerDetails.name}</p>
        <p><strong>Passport Number:</strong> {passengerDetails.passportNumber}</p>
      </div>
      <div className="border p-4 rounded-md shadow-sm space-y-2">
        <h3 className="text-xl font-semibold">Seat Selection</h3>
        <p><strong>Seat Type:</strong> {selectedSeat}</p>
      </div>
    </div>
  );
};

export default TicketSummary;
