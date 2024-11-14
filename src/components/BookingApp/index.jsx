import React, { useState } from "react";
import FlightSearchForm from "../FlightSearchForm";
import AvailableFlights from "../AvailableFlights";
import SeatSelection from "../SeatSelection";
import PassengerDetails from "../PassengerDetails";
import TicketSummary from "../TicketSummary";
import { container } from "../../styles/shared";

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
    <div className={container.page}>
      <div className={container.header}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-2xl font-bold">Flight Booking</h1>
        </div>
      </div>

      <main className={container.content}>
        <div className={container.card}>
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
      </main>
    </div>
  );
};

export default BookingApp;
