import './ResourceCard.css';

const TYPE_ICONS = {
  'Lecture Hall':   '🎓',
  'Laboratory':     '🔬',
  'Study Room':     '📚',
  'Computer Lab':   '💻',
  'Sports Facility':'🏃',
  'Seminar Room':   '💬',
};

const ResourceCard = ({ resource, onBook }) => {
  const { name, type, capacity, description } = resource;

  return (
    <div className="resource-card">
      <div className="resource-card-icon">{TYPE_ICONS[type] || '🏛️'}</div>

      <h3 className="resource-card-title">{name}</h3>

      {description && (
        <p className="resource-card-description">{description}</p>
      )}

      <div className="resource-card-meta">
        <span className={`type-badge type-${type.toLowerCase().replace(/\s+/g, '-')}`}>
          {type}
        </span>
        <span className="resource-card-capacity">👥 {capacity} seats</span>
      </div>

      <button className="book-btn" onClick={() => onBook(resource)}>
        Book Now
      </button>
    </div>
  );
};

export default ResourceCard;