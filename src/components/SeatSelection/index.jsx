import React, { useState } from "react";
import PropTypes from 'prop-types';
import { ArrowRight, Plane } from "lucide-react";
import * as styles from "./styles";
import { button } from "../../styles/shared";

const SeatSelection = ({ flight, passengers, onSeatSelection, onPrevious }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalPassengers = parseInt(passengers.adults) + parseInt(passengers.children);

  const [bookedSeats] = useState(() => {
    const randomSeats = new Set();
    while (randomSeats.size < 10) {
      randomSeats.add(Math.floor(Math.random() * 30) + 1);
    }
    return Array.from(randomSeats);
  });

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onPrevious} className={button.back}>
          <ArrowRight className="transform rotate-180" size={20} />
          <span>Back to Flights</span>
        </button>
      </div>

      <div className={styles.flightInfo}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Select Your Seats</h2>
            <p className="text-sm text-white/80">
              {flight.from} → {flight.to} • {flight.date}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">Flight</p>
            <p className="font-bold text-white">{flight.flightNumber}</p>
          </div>
        </div>
      </div>

      <div className={styles.progress}>
        <p className="font-medium">
          Selected: {selectedSeats.length} of {totalPassengers} seats
        </p>
      </div>

      <div className={styles.seatMapContainer}>
        {/* Airplane nose */}
        <div className={styles.airplaneNose}>
          <Plane size={24} className="text-blue-600" />
        </div>

        {/* Seat map */}
        <div className={styles.seatMap}>
          <div className={styles.seats}>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((seatNum) => {
              const status = getSeatStatus(seatNum);
              return (
                <button
                  key={seatNum}
                  onClick={() => handleSeatClick(seatNum)}
                  disabled={status === 'booked' || status === 'disabled'}
                  className={styles.getSeatClassName(status)}
                >
                  {seatNum}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={styles.availableSeat}></div>
          <span>Available</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.selectedSeat}></div>
          <span>Selected</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.bookedSeat}></div>
          <span>Booked</span>
        </div>
      </div>

      <button
        onClick={() => onSeatSelection(selectedSeats)}
        disabled={selectedSeats.length !== totalPassengers}
        className={selectedSeats.length === totalPassengers ? button.secondary : styles.disabledButton}
      >
        {selectedSeats.length === totalPassengers
          ? 'Continue to Passenger Details'
          : `Please select ${totalPassengers - selectedSeats.length} more seat${
              totalPassengers - selectedSeats.length === 1 ? '' : 's'
            }`}
      </button>
    </div>
  );
};

SeatSelection.propTypes = {
  flight: PropTypes.object.isRequired,
  passengers: PropTypes.object.isRequired,
  onSeatSelection: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default SeatSelection; 