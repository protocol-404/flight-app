import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Plane, Clipboard, ArrowRight, Check } from "lucide-react";
import QRCode from 'react-qr-code';
import * as styles from "./styles";
import { button, text } from "../../styles/shared";

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

      await new Promise(resolve => setTimeout(resolve, 1500));

      setEmailSent(true);
      console.log('Email data:', emailData);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const adultCount = parseInt(searchData.adults);
  const childCount = parseInt(searchData.children);
  const bookingReference = `FR${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const totalPrice = (adultCount * 500) + (childCount * 100);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={text.title}>Booking Confirmation</h2>
        <p className="text-sm">Booking Reference: {bookingReference}</p>
      </div>

      <div className={styles.flightSummary}>
        {/* Flight Details */}
        <div className={styles.flightDetails}>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Flight Number</p>
            <p className="font-bold text-xl">{flight.flightNumber}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-bold text-xl">{flight.date}</p>
          </div>
        </div>

        <div className={styles.timeline}>
          <div className="text-center">
            <p className="font-bold text-2xl">{flight.departureTime}</p>
            <p className="text-gray-600">{flight.from}</p>
          </div>
          <div className="flex-1 px-4">
            <div className={styles.flightPath}>
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
        <div key={index} className={styles.ticketCard}>
          <div className={styles.ticketContent}>
            <div className="space-y-4 flex-1">
              <div className={styles.passengerInfo}>
                <h3 className="font-bold text-xl text-blue-600">
                  {passenger.firstName} {passenger.lastName}
                </h3>
                <p className="text-sm text-gray-600">
                  {index < adultCount ? 'Adult' : 'Child'} Passenger
                </p>
              </div>

              <div className={styles.detailsGrid}>
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

            <div className={styles.qrCode}>
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

          <div className={styles.ticketFooter}>
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-600">Gate closes 1 hours before departure</p>
              <p className="font-medium">Boarding Gate: TBA</p>
            </div>
          </div>
        </div>
      ))}

      {/* Price Summary */}
      <div className={styles.priceSummary}>
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
          className={button.secondary}
        >
          <Clipboard size={20} />
          <span>Download Tickets</span>
        </button>
        <button
          onClick={sendEmail}
          disabled={sending || emailSent}
          className={`${sending || emailSent ? styles.disabledButton : button.primary} 
            flex items-center justify-center space-x-2`}
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

      {/* Email Confirmation */}
      {emailSent && (
        <div className={styles.emailConfirmation}>
          <div className="flex items-center space-x-2 text-green-600">
            <Check size={20} />
            <p className="font-medium">
              Booking confirmation sent to ousama@gmail.com
            </p>
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className={styles.additionalInfo}>
        <h3 className="font-bold text-lg">Important Information</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Please arrive at the airport at least 3 hours before departure</li>
          <li>• Carry a valid ID proof along with this ticket</li>
          <li>• Check-in closes 1 hour before departure</li>
          <li>• Baggage allowance: 23kg for checked baggage</li>
          <li>• For any queries, contact our 24/7 support: +212601442109</li>
        </ul>
      </div>
    </div>
  );
};

TicketSummary.propTypes = {
  flight: PropTypes.object.isRequired,
  passengers: PropTypes.array.isRequired,
  seats: PropTypes.array.isRequired,
  searchData: PropTypes.object.isRequired,
};

export default TicketSummary; 