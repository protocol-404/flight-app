import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Plane, Users, Calendar } from "lucide-react";
import { DESTINATIONS } from "../../constants/flightData";
import * as styles from "./styles";

const FlightSearchForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    adults: 1,
    children: 0,
  });
  const [dateError, setDateError] = useState("");

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      updatedFormData[name] = value;
      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDate = new Date(formData.date);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      setDateError("Please select a future date");
      return;
    }

    if (selectedDate > maxDate) {
      setDateError("Bookings are only available up to 6 months in advance");
      return;
    }

    if (formData.from === formData.to) {
      alert("Departure and destination cities cannot be the same");
      return;
    }

    onNext(formData);
    setFormData({
      from: "",
      to: "",
      date: "",
      adults: 1,
      children: 0,
    });
    setDateError("");
  };

  return (
    <div className="bg-yellow-400 p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6">
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
                <option key={city} value={city}>{city}</option>
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
              {DESTINATIONS.filter((city) => city !== formData.from)
                .map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">
              DATE
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              <input
                type="date"
                name="date"
                required
                min={today}
                max={maxDateStr}
                className={`w-full pl-10 pr-4 py-3 border-2 ${
                  dateError ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:border-blue-600 focus:ring-0`}
                value={formData.date}
                onChange={handleChange}
              />
              {dateError && (
                <p className="absolute text-red-500 text-sm mt-1">{dateError}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">
              ADULTS (500 DH/person)
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              <select
                name="adults"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-0 appearance-none bg-white"
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
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              <select
                name="children"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-0 appearance-none bg-white"
                value={formData.children}
                onChange={handleChange}
              >
                {[0, 1, 2, 3, 4].map((num) => {
                  let childLabel;
                  if (num !== 1) {
                    childLabel = `${num} Children`;
                  } else {
                    childLabel = `${num} Child`;
                  }
                  return (
                    <option key={num} value={num}>
                      {childLabel} ({num * 100} DH)
                    </option>
                  );
                })}
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
          className="w-full p-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
        >
          Search Flights
        </button>
      </form>
    </div>
  );
};

FlightSearchForm.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default FlightSearchForm;