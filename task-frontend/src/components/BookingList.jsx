import BookingCard from './BookingCard';
import './BookingList.css';

const BookingList = ({ bookings, onCancelled }) => {
  if (bookings.length === 0) {
    return (
      <>
        <h2 className="section-title">Current Bookings</h2>
        <p className="no-items">No bookings yet. Go to Resources to make your first booking!</p>
      </>
    );
  }

  return (
    <>
      <h2 className="section-title">Current Bookings</h2>

      <div className="booking-list">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onCancelled={onCancelled}
          />
        ))}
      </div>
    </>
  );
};

export default BookingList;