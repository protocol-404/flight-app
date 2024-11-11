import React, { useState } from 'react';
import { Plane, Camera, Clipboard } from 'lucide-react';

// Mock flight data
const AVAILABLE_FLIGHTS = [
  {
    id: 1,
    from: 'New York',
    to: 'Los Angeles',
    date: '2024-11-15',
    price: 500,
    departureTime: '10:00 AM',
    arrivalTime: '1:00 PM',
  },
  {
    id: 2,
    from: 'Los Angeles',
    to: 'Chicago',
    date: '2024-11-15',
    price: 450,
    departureTime: '2:00 PM',
    arrivalTime: '8:00 PM',
  },
  {
    id: 3,
    from: 'Miami',
    to: 'New York',
    date: '2024-11-15',
    price: 350,
    departureTime: '7:00 AM',
    arrivalTime: '10:00 AM',
  },
];

// Available destinations
const DESTINATIONS = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle', 'Boston'];

const FlightSearchForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    adults: 1,
    children: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('searchData', JSON.stringify(formData));
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Flight Search</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">From</label>
          <select
            name="from"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.from}
            onChange={handleChange}
          >
            <option value="">Select departure</option>
            {DESTINATIONS.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">To</label>
          <select
            name="to"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.to}
            onChange={handleChange}
          >
            <option value="">Select destination</option>
            {DESTINATIONS.filter(city => city !== formData.from).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Adults</label>
          <select
            name="adults"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.adults}
            onChange={handleChange}
          >
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Children</label>
          <select
            name="children"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.children}
            onChange={handleChange}
          >
            {[0,1,2,3,4].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Search Flights
      </button>
    </form>
  );
};

const AvailableFlights = ({ searchData, onFlightSelect }) => {
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

const SeatSelection = ({ flight, passengers, onSeatSelection }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalPassengers = parseInt(passengers.adults) + parseInt(passengers.children);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(prev => prev.filter(seat => seat !== seatNumber));
    } else if (selectedSeats.length < totalPassengers) {
      setSelectedSeats(prev => [...prev, seatNumber]);
    }
  };

  const calculateTotal = () => {
    const adultPrice = 500;
    const childPrice = 100;
    return (passengers.adults * adultPrice) + (passengers.children * childPrice);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Select Your Seats</h2>
      <p className="text-gray-600">
        Please select {totalPassengers} seat{totalPassengers > 1 ? 's' : ''}
      </p>
      
      <div className="grid grid-cols-6 gap-2 mx-auto max-w-md">
        {Array.from({ length: 30 }, (_, i) => i + 1).map(seatNum => (
          <button
            key={seatNum}
            onClick={() => handleSeatClick(seatNum)}
            disabled={!selectedSeats.includes(seatNum) && selectedSeats.length >= totalPassengers}
            className={`p-2 text-center rounded ${
              selectedSeats.includes(seatNum)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            } ${
              !selectedSeats.includes(seatNum) && selectedSeats.length >= totalPassengers
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {seatNum}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-lg font-bold">Total Price: {calculateTotal()} DH</p>
        <button
          onClick={() => onSeatSelection(selectedSeats)}
          disabled={selectedSeats.length !== totalPassengers}
          className={`w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded-md ${
            selectedSeats.length === totalPassengers
              ? 'hover:bg-blue-600'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Continue to Passenger Details
        </button>
      </div>
    </div>
  );
};

const PassengerDetails = ({ totalPassengers, onSubmit }) => {
  const [passengers, setPassengers] = useState(
    Array(totalPassengers).fill().map(() => ({
      firstName: '',
      lastName: '',
      age: '',
    }))
  );

  const handleChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index] = {
      ...newPassengers[index],
      [field]: value
    };
    setPassengers(newPassengers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('passengerDetails', JSON.stringify(passengers));
    onSubmit(passengers);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Passenger Details</h2>
      
      {passengers.map((passenger, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <h3 className="font-medium">Passenger {index + 1}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                required
                type="text"
                value={passenger.firstName}
                onChange={(e) => handleChange(index, 'firstName', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                required
                type="text"
                value={passenger.lastName}
                onChange={(e) => handleChange(index, 'lastName', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1">Age</label>
              <input
                required
                type="number"
                min="0"
                max="120"
                value={passenger.age}
                onChange={(e) => handleChange(index, 'age', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Continue to Summary
      </button>
    </form>
  );
};

const TicketSummary = ({ flight, passengers, seats }) => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Booking Summary</h2>
      
      {passengers.map((passenger, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">
                {passenger.firstName} {passenger.lastName}
              </h3>
              <p className="text-gray-600">Age: {passenger.age}</p>
              <p className="text-gray-600">Seat: {seats[index]}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{flight.date}</p>
              <p className="font-medium">{flight.from} → {flight.to}</p>
              <p className="text-sm text-gray-500">
                {flight.departureTime} - {flight.arrivalTime}
              </p>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => window.print()}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Download Tickets
      </button>
    </div>
  );
};

const BookingApp = () => {
  const [step, setStep] = useState(0);
  const [searchData, setSearchData] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);

  const handleSearch = (data) => {
    setSearchData(data);
    setStep(1);
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    localStorage.setItem('selectedFlight', JSON.stringify(flight));
    setStep(2);
  };

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
    localStorage.setItem('selectedSeats', JSON.stringify(seats));
    setStep(3);
  };

  const handlePassengerDetails = (details) => {
    setPassengerDetails(details);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
        {step === 0 && <FlightSearchForm onNext={handleSearch} />}
        {step === 1 && <AvailableFlights searchData={searchData} onFlightSelect={handleFlightSelect} />}
        {step === 2 && (
          <SeatSelection
            flight={selectedFlight}
            passengers={searchData}
            onSeatSelection={handleSeatSelection}
          />
        )}
        {step === 3 && (
          <PassengerDetails
            totalPassengers={parseInt(searchData.adults) + parseInt(searchData.children)}
            onSubmit={handlePassengerDetails}
          />
        )}
        {step === 4 && (
          <TicketSummary
            flight={selectedFlight}
            passengers={passengerDetails}
            seats={selectedSeats}
          />
        )}
      </div>
    </div>
  );
};

export default BookingApp;