const NoteItem = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="edit-btn">
            ✏️
          </button>
          <button onClick={() => onDelete(note.id)} className="delete-btn">
            🗑️
          </button>
        </div>
      </div>
      {note.description && (
        <p className="note-description">{note.description}</p>
      )}
      {note.attachment && (
        <p className="note-attachment">
          Attachment: <a href={note.attachment} target="_blank" rel="noopener noreferrer">Download</a>
        </p>
      )}
      <div className="note-footer">
        <small className="note-date">
          Created: {formatDate(note.created_at)}
        </small>
        {note.updated_at !== note.created_at && (
          <small className="note-date">
            Updated: {formatDate(note.updated_at)}
          </small>
        )}
      </div>
    </div>
  );
};

export default NoteItem;