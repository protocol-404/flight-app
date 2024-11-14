import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
  Plane,
  Camera,
  Clipboard,
  ArrowRight,
  Users,
  Calendar,
  Check,
} from "lucide-react";
import QRCode from 'react-qr-code';

const AVAILABLE_FLIGHTS = [
  {
    id: 1,
    from: "Casablanca",
    to: "Los Angeles",
    date: "2024-11-15",
    price: 500,
    departureTime: "10:00",
    arrivalTime: "13:00",
    duration: "3h 00m",
    flightNumber: "FR 1234",
  },
  {
    id: 2,
    from: "Los Angeles",
    to: "Chicago",
    date: "2024-11-15",
    price: 450,
    departureTime: "14:00",
    arrivalTime: "20:00",
    duration: "6h 00m",
    flightNumber: "FR 5678",
  },
  {
    id: 3,
    from: "Miami",
    to: "Casablanca",
    date: "2024-11-15",
    price: 350,
    departureTime: "07:00",
    arrivalTime: "10:00",
    duration: "3h 00m",
    flightNumber: "FR 9012",
  },
];

const DESTINATIONS = [
  "Casablanca",
  "Los Angeles",
  "Chicago",
  "Miami",
  "Seattle",
  "Boston",
];

const FlightSearchForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    adults: 1,
    children: 0,
  });
  const [dateError, setDateError] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get date 6 months from now
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special validation for date
    if (name === 'date') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      
      // Reset hours to compare just the dates
      selectedDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      
      if (selectedDate < currentDate) {
        setDateError("Please select a future date");
      } else if (selectedDate > maxDate) {
        setDateError("Bookings are only available up to 6 months in advance");
      } else {
        setDateError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Additional date validation before submission
    const selectedDate = new Date(formData.date);
    const currentDate = new Date();
    
    // Reset hours to compare just the dates
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < currentDate) {
      setDateError("Please select a future date");
      return;
    }
    
    if (selectedDate > maxDate) {
      setDateError("Bookings are only available up to 6 months in advance");
      return;
    }
    
    // Validate that destination is different from departure
    if (formData.from === formData.to) {
      alert("Departure and destination cities cannot be the same");
      return;
    }

    onNext(formData);
  };

  return (
    <div className="bg-yellow-400 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 space-y-6"
      >
        <div className="flex items-center space-x-2 text-blue-600">
          <Plane size={24} />
          <h2 className="text-2xl font-bold">Search flights</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-bold mb-1 text-gray-700">
              FROM
            </label>
            <select
              name="from"
              required
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-0"
              value={formData.from}
              onChange={handleChange}
            >
              <option value="">Select departure</option>
              {DESTINATIONS.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-bold mb-1 text-gray-700">
              TO
            </label>
            <select
              name="to"
              required
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-0"
              value={formData.to}
              onChange={handleChange}
            >
              <option value="">Select destination</option>
              {DESTINATIONS.filter((city) => city !== formData.from).map(
                (city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">
              DATE
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="date"
                name="date"
                required
                min={today}
                max={maxDateStr}
                className={`w-full p-3 pl-10 border-2 rounded-lg focus:ring-0 ${
                  dateError 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-600'
                }`}
                value={formData.date}
                onChange={handleChange}
              />
              {dateError && (
                <p className="absolute text-red-500 text-sm mt-1">
                  {dateError}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">
              ADULTS (500 DH/person)
            </label>
            <div className="relative">
              <Users
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <select
                name="adults"
                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-0"
                value={formData.adults}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Adult{num > 1 ? "s" : ""} ({num * 500} DH)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">
              CHILDREN (100 DH/person)
            </label>
            <div className="relative">
              <Users
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <select
                name="children"
                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-0"
                value={formData.children}
                onChange={handleChange}
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} Child{num !== 1 ? "ren" : ""} ({num * 100} DH)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Price Summary</p>
              <div className="text-sm text-gray-600">
                <p>Adults: {formData.adults} × 500 DH = {formData.adults * 500} DH</p>
                <p>Children: {formData.children} × 100 DH = {formData.children * 100} DH</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                {formData.adults * 500 + formData.children * 100} DH
              </p>
              <p className="text-sm text-gray-600">Total (excluding seat selection)</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-bold text-lg transition-colors"
        >
          Search Flights
        </button>
      </form>
    </div>
  );
};

const AvailableFlights = ({ searchData, onFlightSelect, onPrevious }) => {
  const filteredFlights = AVAILABLE_FLIGHTS.filter(
    (flight) => flight.from === searchData.from && flight.to === searchData.to
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowRight className="transform rotate-180" size={20} />
          <span>Back to Search</span>
        </button>
      </div>

      <div className="bg-blue-600 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">
          {searchData.from} → {searchData.to}
        </h2>
        <p className="text-sm">{searchData.date}</p>
      </div>

      {filteredFlights.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500 font-medium">
            No flights available for selected route
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 transition-colors"
            >
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-500">
                      {flight.flightNumber}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-2xl font-bold">
                          {flight.departureTime}
                        </p>
                        <p className="text-sm text-gray-500">{flight.from}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-px w-12 bg-gray-300"></div>
                        <Plane className="text-blue-600" size={20} />
                        <div className="h-px w-12 bg-gray-300"></div>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {flight.arrivalTime}
                        </p>
                        <p className="text-sm text-gray-500">{flight.to}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Duration: {flight.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">
                      {flight.price} DH
                    </p>
                    <button
                      onClick={() => onFlightSelect(flight)}
                      className="mt-2 px-6 py-2 bg-yellow-400 text-blue-600 font-bold rounded-lg hover:bg-yellow-500 transition-colors"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SeatSelection = ({ flight, passengers, onSeatSelection, onPrevious }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalPassengers = parseInt(passengers.adults) + parseInt(passengers.children);

  // Create array of already booked seats (simulation)
  const [bookedSeats] = useState(() => {
    const randomSeats = new Set();
    while (randomSeats.size < 10) {
      randomSeats.add(Math.floor(Math.random() * 30) + 1);
    }
    return Array.from(randomSeats);
  });

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return; // Seat is already booked

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats((prev) => prev.filter((seat) => seat !== seatNumber));
    } else if (selectedSeats.length < totalPassengers) {
      setSelectedSeats((prev) => [...prev, seatNumber].sort((a, b) => a - b));
    }
  };

  const getSeatStatus = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return 'booked';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    if (selectedSeats.length >= totalPassengers) return 'disabled';
    return 'available';
  };

  const getSeatClassName = (status) => {
    const baseClass = 'relative p-4 rounded-lg font-bold transition-all duration-200 flex items-center justify-center';
    switch (status) {
      case 'booked':
        return `${baseClass} bg-gray-200 text-gray-400 cursor-not-allowed`;
      case 'selected':
        return `${baseClass} bg-blue-600 text-white`;
      case 'disabled':
        return `${baseClass} bg-gray-100 text-gray-400 cursor-not-allowed`;
      default:
        return `${baseClass} bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer`;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white">
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowRight className="transform rotate-180" size={20} />
          <span>Back to Flights</span>
        </button>
      </div>

      {/* Flight Info Header */}
      <div className="bg-blue-600 text-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Select Your Seats</h2>
            <p className="text-sm">
              {flight.from} → {flight.to} • {flight.date}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm">Flight</p>
            <p className="font-bold">{flight.flightNumber}</p>
          </div>
        </div>
      </div>

      {/* Selection Progress */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <p className="font-medium">
            Selected: {selectedSeats.length} of {totalPassengers} seats
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="relative">
          <div className="w-24 h-12 bg-gray-200 rounded-t-full mx-auto mb-4"></div>
          
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-6 gap-3">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((seatNum) => {
                const status = getSeatStatus(seatNum);
                return (
                  <button
                    type="button"
                    key={seatNum}
                    onClick={() => handleSeatClick(seatNum)}
                    disabled={status === 'booked' || status === 'disabled'}
                    className={getSeatClassName(status)}
                  >
                    {seatNum}
                    {status === 'selected' && (
                      <Check size={16} className="absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-100 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <span>Booked</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => onSeatSelection(selectedSeats)}
          disabled={selectedSeats.length !== totalPassengers}
          className={`
            w-full p-4 rounded-lg font-bold text-lg transition-colors
            ${selectedSeats.length === totalPassengers
              ? 'bg-yellow-400 hover:bg-yellow-500 text-blue-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
          `}
        >
          {selectedSeats.length === totalPassengers
            ? 'Continue to Passenger Details'
            : `Please select ${totalPassengers - selectedSeats.length} more seat${
                totalPassengers - selectedSeats.length === 1 ? '' : 's'
              }`}
        </button>
      </div>
    </div>
  );
};

const PassengerDetails = ({ totalPassengers, onSubmit }) => {
  const [passengers, setPassengers] = useState(
    Array(totalPassengers)
      .fill()
      .map(() => ({
        firstName: "",
        lastName: "",
        age: "",
        nationality: "",
        passportNumber: "",
      }))
  );

  const handleChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index] = {
      ...newPassengers[index],
      [field]: value,
    };
    setPassengers(newPassengers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(passengers);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="bg-blue-600 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">Passenger Details</h2>
        <p className="text-sm">
          Please enter details as they appear on official ID
        </p>
      </div>

      {passengers.map((passenger, index) => (
        <div key={index} className="bg-white rounded-lg p-6 space-y-4">
          <div className="flex items-center space-x-2 text-blue-600 mb-4">
            <Users size={24} />
            <h3 className="text-lg font-bold">Passenger {index + 1}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">
                FIRST NAME
              </label>
              <input
                requiredadult_0_lastname: Stevens
                type="text"
                value={passenger.firstName}
                onChange={(e) =>
                  handleChange(index, "firstName", e.target.value)
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-0"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">
                LAST NAME
              </label>
              <input
                required
                type="text"
                value={passenger.lastName}
                onChange={(e) =>
                  handleChange(index, "lastName", e.target.value)
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-0"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">
                AGE
              </label>
              <input
                required
                type="number"
                min="0"
                max="120"
                value={passenger.age}
                onChange={(e) => handleChange(index, "age", e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-0"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">
                NATIONALITY
              </label>
              <input
                required
                type="text"
                value={passenger.nationality}
                onChange={(e) =>
                  handleChange(index, "nationality", e.target.value)
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-0"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold mb-1 text-gray-700">
                PASSPORT NUMBER
              </label>
              <input
                required
                type="text"
                value={passenger.passportNumber}
                onChange={(e) =>
                  handleChange(index, "passportNumber", e.target.value)
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-0"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full p-4 bg-yellow-400 text-blue-600 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors"
      >
        Continue to Summary
      </button>
    </form>
  );
};

const TicketSummary = ({ flight, passengers, seats, searchData }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);

  const sendEmail = async () => {
    setSending(true);
    try {

      const emailData = {
        to: 'oujaberousama@gmail.com',
        subject: `Flight Booking Confirmation - ${flight.flightNumber}`,
        booking: {
          reference: bookingReference,
          flight,
          passengers,
          seats,
          totalPrice: (adultCount * 500) + (childCount * 100)
        }
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailSent(true);
      // In reality, you would make an actual API call here
      console.log('Email data:', emailData);
    } catch (error) {
      alert('Failed to send email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const adultCount = parseInt(searchData.adults);
  const childCount = parseInt(searchData.children);
  const bookingReference = `FR${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  // Calculate total without seat prices
  const totalPrice = (adultCount * 500) + (childCount * 100);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-blue-600 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">Booking Confirmation</h2>
        <p className="text-sm">Booking Reference: {bookingReference}</p>
      </div>

      {/* Flight Summary Card */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Flight Number</p>
            <p className="font-bold text-xl">{flight.flightNumber}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-bold text-xl">{flight.date}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
          <div className="text-center">
            <p className="font-bold text-2xl">{flight.departureTime}</p>
            <p className="text-gray-600">{flight.from}</p>
          </div>
          <div className="flex-1 px-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px flex-1 bg-blue-600"></div>
              <Plane className="text-blue-600 transform rotate-90" size={24} />
              <div className="h-px flex-1 bg-blue-600"></div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-1">
              Duration: {flight.duration}
            </p>
          </div>
          <div className="text-center">
            <p className="font-bold text-2xl">{flight.arrivalTime}</p>
            <p className="text-gray-600">{flight.to}</p>
          </div>
        </div>
      </div>

      {/* Passenger Tickets */}
      {passengers.map((passenger, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 flex justify-between items-start">
            <div className="space-y-4 flex-1">
              <div className="flex items-center space-x-4">
                <Users className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-bold text-xl text-blue-600">
                    {passenger.firstName} {passenger.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {index < adultCount ? 'Adult' : 'Child'} Passenger
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Passport</p>
                  <p className="font-medium">{passenger.passportNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nationality</p>
                  <p className="font-medium">{passenger.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seat Number</p>
                  <p className="font-bold text-blue-600">{seats[index]}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fare</p>
                  <p className="font-medium">
                    {index < adultCount ? '500 DH' : '100 DH'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="ml-6">
              <QRCode
                value={`${bookingReference}-${passenger.passportNumber}-${seats[index]}`}
                size={100}
                level="M"
              />
              <p className="text-xs text-center mt-2 text-gray-600">
                Scan for verification
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-600">Gate closes 30 mins before departure</p>
              <p className="font-medium">Boarding Gate: TBA</p>
            </div>
          </div>
        </div>
      ))}

      {/* Price Summary */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Price Summary</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Adults ({adultCount} × 500 DH)</p>
            <p className="font-medium">{adultCount * 500} DH</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Children ({childCount} × 100 DH)</p>
            <p className="font-medium">{childCount * 100} DH</p>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between">
              <p className="font-bold">Total Amount</p>
              <p className="font-bold text-blue-600 text-xl">
                {totalPrice} DH
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => window.print()}
          className="p-4 bg-yellow-400 text-blue-600 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center space-x-2"
        >
          <Clipboard size={20} />
          <span>Download Tickets</span>
        </button>
        <button
          onClick={sendEmail}
          disabled={sending || emailSent}
          className={`p-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2
            ${sending || emailSent 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'} 
            transition-colors`}
        >
          {sending ? (
            <span>Sending...</span>
          ) : emailSent ? (
            <>
              <Check size={20} />
              <span>Email Sent</span>
            </>
          ) : (
            <>
              <ArrowRight size={20} />
              <span>Send to Email</span>
            </>
          )}
        </button>
      </div>

      {/* Email Sent Confirmation */}
      {emailSent && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-green-600">
            <Check size={20} />
            <p className="font-medium">
              Booking confirmation sent to ousama@gmail.com
            </p>
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h3 className="font-bold text-lg">Important Information</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Please arrive at the airport at least 3 hours before departure</li>
          <li>• Carry a valid ID proof along with this ticket</li>
          <li>• Check-in closes 1 hour before departure</li>
          <li>• Baggage allowance: 23kg for checked baggage</li>
          <li>• For any queries, contact our 24/7 support: +1234567890</li>
        </ul>
      </div>
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
    setStep(2);
  };

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
    setStep(3);
  };

  const handlePassengerDetails = (details) => {
    setPassengerDetails(details);
    setStep(4);
  };

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white text-2xl font-bold">Flight Booking</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg">
          {step === 0 && <FlightSearchForm onNext={handleSearch} />}
          {step === 1 && (
            <AvailableFlights
              searchData={searchData}
              onFlightSelect={handleFlightSelect}
              onPrevious={handlePrevious}
            />
          )}
          {step === 2 && (
            <SeatSelection
              flight={selectedFlight}
              passengers={searchData}
              onSeatSelection={handleSeatSelection}
              onPrevious={handlePrevious}
            />
          )}
          {step === 3 && (
            <PassengerDetails
              totalPassengers={
                parseInt(searchData.adults) + parseInt(searchData.children)
              }
              onSubmit={handlePassengerDetails}
            />
          )}
          {step === 4 && (
            <TicketSummary
              flight={selectedFlight}
              passengers={passengerDetails}
              seats={selectedSeats}
              searchData={searchData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingApp;
