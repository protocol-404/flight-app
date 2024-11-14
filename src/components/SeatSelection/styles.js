export const container = "p-6 space-y-6";
export const header = "flex justify-between items-center mb-6";
export const flightInfo = "bg-blue-600 p-4 rounded-lg mb-6";

export const progress = "bg-blue-50 p-4 rounded-lg text-blue-600";

export const seatMapContainer = "max-w-2xl mx-auto my-8";
export const airplaneNose = "w-20 h-20 bg-gray-100 rounded-t-full mx-auto flex items-center justify-center";

export const seatMap = "bg-white rounded-lg p-8 shadow-lg";
export const seats = "grid grid-cols-6 gap-4 max-w-xl mx-auto";

export const getSeatClassName = (status) => {
  const baseClass = "relative w-12 h-12 rounded-lg font-bold transition-all duration-200 flex items-center justify-center text-sm";
  
  switch (status) {
    case 'booked':
      return `${baseClass} bg-gray-200 text-gray-400 cursor-not-allowed`;
    case 'selected':
      return `${baseClass} bg-blue-600 text-white hover:bg-blue-700`;
    case 'disabled':
      return `${baseClass} bg-gray-100 text-gray-400 cursor-not-allowed`;
    default:
      return `${baseClass} bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer`;
  }
};

export const legend = "flex justify-center items-center space-x-6 text-sm my-6";
export const legendItem = "flex items-center space-x-2";

export const availableSeat = "w-6 h-6 bg-gray-100 rounded-lg border border-gray-200";
export const selectedSeat = "w-6 h-6 bg-blue-600 rounded-lg";
export const bookedSeat = "w-6 h-6 bg-gray-200 rounded-lg";

export const disabledButton = `
  w-full p-4 bg-gray-200 text-gray-500 rounded-lg font-bold text-lg 
  cursor-not-allowed transition-colors flex items-center justify-center gap-2
`;