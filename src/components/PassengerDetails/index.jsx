import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Users } from "lucide-react";
import * as styles from "./styles";
import { button, input, text } from "../../styles/shared";

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
    setPassengers((prevPassengers) => {
      const newPassengers = [...prevPassengers];
      newPassengers[index] = {
        ...newPassengers[index],
        [field]: value,
      };
      return newPassengers;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(passengers);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.header}>
        <h2 className={text.title}>Passenger Details</h2>
        <p className="text-sm">
          Please enter details as they appear on official ID
        </p>
      </div>

      {passengers.map((passenger, index) => (
        <div key={index} className={styles.passengerCard}>
          <div className={styles.passengerHeader}>
            <Users size={24} />
            <h3 className={text.subtitle}>Passenger {index + 1}</h3>
          </div>

          <div className={styles.formGrid}>
            <div>
              <label className={text.label}>FIRST NAME</label>
              <input
                required
                type="text"
                value={passenger.firstName}
                onChange={(e) => handleChange(index, "firstName", e.target.value)}
                className={input.base}
              />
            </div>
            <div>
              <label className={text.label}>LAST NAME</label>
              <input
                required
                type="text"
                value={passenger.lastName}
                onChange={(e) => handleChange(index, "lastName", e.target.value)}
                className={input.base}
              />
            </div>
            <div>
              <label className={text.label}>AGE</label>
              <input
                required
                type="number"
                min="0"
                max="120"
                value={passenger.age}
                onChange={(e) => handleChange(index, "age", e.target.value)}
                className={input.base}
              />
            </div>
            <div>
              <label className={text.label}>NATIONALITY</label>
              <input
                required
                type="text"
                value={passenger.nationality}
                onChange={(e) => handleChange(index, "nationality", e.target.value)}
                className={input.base}
              />
            </div>
            <div className="col-span-2">
              <label className={text.label}>PASSPORT NUMBER</label>
              <input
                required
                type="text"
                value={passenger.passportNumber}
                onChange={(e) => handleChange(index, "passportNumber", e.target.value)}
                className={input.base}
              />
            </div>
          </div>
        </div>
      ))}

      <button type="submit" className={button.secondary}>
        Continue to Summary
      </button>
    </form>
  );
};

PassengerDetails.propTypes = {
  totalPassengers: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PassengerDetails;
