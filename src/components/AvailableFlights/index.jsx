import React from "react";
import PropTypes from 'prop-types';
import { Plane, ArrowRight } from "lucide-react";
import { AVAILABLE_FLIGHTS } from "../../constants/flightData";
import * as styles from "./styles";
import { button } from "../../styles/shared";

const AvailableFlights = ({ searchData, onFlightSelect, onPrevious }) => {
  const filteredFlights = AVAILABLE_FLIGHTS.filter(
    (flight) => flight.from === searchData.from && flight.to === searchData.to
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onPrevious} className={button.back}>
          <ArrowRight className="transform rotate-180" size={20} />
          <span>Back to Search</span>
        </button>
      </div>

      <div className={styles.searchInfo}>
        <h2 className={styles.route}>
          {searchData.from} → {searchData.to}
        </h2>
        <p className="text-sm">{searchData.date}</p>
      </div>

      {filteredFlights.length === 0 ? (
        <div className={styles.noFlights}>
          <p className="text-gray-500 font-medium">
            No flights available for selected route
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFlights.map((flight) => (
            <div key={flight.id} className={styles.flightCard}>
              <div className="p-4">
                <div className={styles.flightContent}>
                  <div className="space-y-2">
                    <p className={styles.flightNumber}>{flight.flightNumber}</p>
                    <div className={styles.timelineContainer}>
                      <div>
                        <p className={styles.time}>{flight.departureTime}</p>
                        <p className={styles.city}>{flight.from}</p>
                      </div>
                      <div className={styles.timeline}>
                        <div className="h-px w-12 bg-gray-300"></div>
                        <Plane className="text-blue-600" size={20} />
                        <div className="h-px w-12 bg-gray-300"></div>
                      </div>
                      <div>
                        <p className={styles.time}>{flight.arrivalTime}</p>
                        <p className={styles.city}>{flight.to}</p>
                      </div>
                    </div>
                    <p className={styles.duration}>Duration: {flight.duration}</p>
                  </div>
                  <div className={styles.priceSection}>
                    {/* <p className={styles.price}>{flight.price} DH</p> */}
                    <button
                      onClick={() => onFlightSelect(flight)}
                      className={styles.selectButton}
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

AvailableFlights.propTypes = {
  searchData: PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onFlightSelect: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default AvailableFlights; 