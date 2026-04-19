import { useState } from 'react';
import axios from 'axios';
import './BookingCard.css';

const BookingCard = ({ booking, onCancelled }) => {
  const { id, requested_by, resource_name, booking_date } = booking;
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString + 'T12:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleCancel = async () => {
    if (!window.confirm(`Cancel booking for "${resource_name}"?`)) return;

    setCancelling(true);
    setError(null);

      await axios.delete(`/api/bookings/${id}`);
      onCancelled(id);
    
  };

  return (
    <div className={`booking-card ${cancelling ? 'booking-card--removing' : ''}`}>
      <div className="booking-avatar">
        {requested_by.charAt(0).toUpperCase()}
      </div>

      <div className="booking-info">
        <p className="booking-person">{requested_by}</p>
        <p className="booking-resource">{resource_name}</p>
      </div>

      <div className="booking-date">
        📅 {formatDate(booking_date)}
      </div>

      <div className="booking-actions">
        {error && <span className="booking-error">⚠ {error}</span>}
        <button
          className="cancel-btn"
          onClick={handleCancel}
          disabled={cancelling}
        >
          {cancelling ? (
            <span className="btn-loading">
              <span className="spinner-red" /> Cancelling…
            </span>
          ) : (
            '✕ Cancel'
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingCard;