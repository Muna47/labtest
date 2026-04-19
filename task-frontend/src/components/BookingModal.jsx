import { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingModal.css';

const BookingModal = ({ resource, onClose, onBooked }) => {
  const [requestedBy, setRequestedBy] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const formatDate = (dateString) => {
    return new Date(dateString + 'T12:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requestedBy.trim() || !bookingDate) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/bookings', {
        resource_id: resource.id,
        requested_by: requestedBy.trim(),
        booking_date: bookingDate,
      });
      setSuccess(true);
      onBooked(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2 className="modal-title">Book Resource</h2>
          <p className="modal-subtitle">{resource.name}</p>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-body">
          {success ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Booking Confirmed!</h3>
              <p>
                <strong>{requestedBy}</strong> has successfully booked{' '}
                <strong>{resource.name}</strong> on{' '}
                <strong>{formatDate(bookingDate)}</strong>.
              </p>
              <button className="submit-btn" onClick={onClose}>Done</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="requested_by">Your Name</label>
                <input
                  id="requested_by"
                  type="text"
                  placeholder="e.g. Dr. Sarah Ahmed"
                  value={requestedBy}
                  onChange={(e) => setRequestedBy(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="booking_date">Booking Date</label>
                <input
                  id="booking_date"
                  type="date"
                  value={bookingDate}
                  min={today}
                  onChange={(e) => setBookingDate(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              {error && <div className="form-error">⚠ {error}</div>}

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading || !requestedBy.trim() || !bookingDate}
                >
                  {loading ? (
                    <span className="btn-loading">
                      <span className="spinner" /> Booking…
                    </span>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookingModal;