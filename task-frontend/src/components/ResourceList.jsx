import { useState, useEffect } from 'react';
import axios from 'axios';
import ResourceCard from './ResourceCard';
import BookingModal from './BookingModal';
import './ResourceList.css';

const ResourceList = ({ onBooked }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
        const response = await axios.get('/api/resources');
        setResources(response.data.data || []);
        setLoading(false);
      
    };

    fetchResources();
  }, []);

  if (loading) return <div className="loading">Loading resources...</div>;

  return (
    <>
      <h2 className="section-title">Available Resources</h2>

      {resources.length === 0 ? (
        <p className="no-items">No resources found.</p>
      ) : (
        <div className="resource-grid">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onBook={setSelectedResource}
            />
          ))}
        </div>
      )}

      {selectedResource && (
        <BookingModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          onBooked={(booking) => {
            onBooked(booking);
            setSelectedResource(null);
          }}
        />
      )}
    </>
  );
};

export default ResourceList;