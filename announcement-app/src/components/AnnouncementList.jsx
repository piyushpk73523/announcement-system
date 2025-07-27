import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAnnouncements,
  deleteAnnouncement,
} from "../api/announcementService";

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncements(announcements.filter((a) => a.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="announcement-list">
      <Link to="/create" className="create-btn">
        Create New
      </Link>

      {announcements.map((ann) => (
        <div key={ann.id} className="announcement-card">
          <h3>{ann.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: ann.description }} />
          <div className="actions">
            <Link to={`/edit/${ann.id}`} className="edit-btn">
              Edit
            </Link>
            <button onClick={() => handleDelete(ann.id)} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
