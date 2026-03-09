import { useState } from 'react';

const NoteForm = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [description, setDescription] = useState(note?.description || '');
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: title.trim(),
      description: description.trim(),
    };
    if (attachment) {
      payload.attachment = attachment;
    }
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="title-input"
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Note description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="description-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="attachment">Attachment (optional):</label>
        <input
          id="attachment"
          type="file"
          onChange={(e) => setAttachment(e.target.files[0] || null)}
          className="file-input"
        />
        {note?.attachment && !attachment && (
          <small>
            Current file: <a href={note.attachment} target="_blank" rel="noopener noreferrer">View</a>
          </small>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" className="save-btn">
          {note ? 'Update' : 'Add'} Note
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;