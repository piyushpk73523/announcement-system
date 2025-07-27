import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnnouncementForm from "../components/AnnouncementForm";
import { getAnnouncementById } from "../api/announcementService";

export default function EditAnnouncement() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const data = await getAnnouncementById(id);
        setAnnouncement(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncement();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!announcement) return <div>Announcement not found</div>;

  return (
    <div className="edit-page">
      <h2>Edit Announcement</h2>
      <AnnouncementForm initialData={announcement} />
    </div>
  );
}
