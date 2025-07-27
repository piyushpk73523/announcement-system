import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";
import {
  createAnnouncement,
  updateAnnouncement,
} from "../api/announcementService"; // Removed unused import

export default function AnnouncementForm({ initialData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (id) {
        await updateAnnouncement(id, { title, description });
      } else {
        await createAnnouncement({ title, description });
      }
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="announcement-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <RichTextEditor value={description} onChange={setDescription} />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
