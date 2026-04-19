import { useState, useEffect } from 'react';
import axios from 'axios';
import ResourceList from './components/ResourceList';
import BookingList from './components/BookingList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('resources');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get('/api/bookings')
      .then((res) => setBookings(res.data.data || []))
      .catch(() => {});
  }, []);

  const handleBooked = (newBooking) => {
    setBookings((prev) =>
      [...prev, newBooking].sort(
        (a, b) => new Date(a.booking_date) - new Date(b.booking_date)
      )
    );
  };

  const handleCancelled = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="app-container">
      <header>
        <h1>University Resource Booking</h1>
        <p>Browse available rooms and manage your reservations</p>
      </header>

      <main>
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
          <button
            className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            Schedule
            <span className="tab-badge">{bookings.length}</span>
          </button>
        </div>

        {activeTab === 'resources' && (
          <ResourceList onBooked={handleBooked} />
        )}

        {activeTab === 'schedule' && (
          <BookingList bookings={bookings} onCancelled={handleCancelled} />
        )}
      </main>
    </div>
  );
}

export default App;