// AvailableFlights.jsx
import React from 'react';
import { Plane } from 'lucide-react';

const AvailableFlights = ({ searchData, onFlightSelect, AVAILABLE_FLIGHTS }) => {
  const filteredFlights = AVAILABLE_FLIGHTS.filter(flight => 
    flight.from === searchData.from && 
    flight.to === searchData.to
  );

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Available Flights</h2>
      {filteredFlights.length === 0 ? (
        <p className="text-center text-gray-500">No flights available for selected route</p>
      ) : (
        <div className="space-y-4">
          {filteredFlights.map(flight => (
            <div key={flight.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Plane className="text-blue-500" />
                  <div>
                    <p className="font-medium">{flight.from} → {flight.to}</p>
                    <p className="text-sm text-gray-500">
                      {flight.departureTime} - {flight.arrivalTime}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{flight.price} DH</p>
                  <button
                    onClick={() => onFlightSelect(flight)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableFlights;
