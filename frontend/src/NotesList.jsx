import { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from './api';
import NoteItem from './NoteItem';
import NoteForm from './NoteForm';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      await createNote(noteData);
      await loadNotes();
      setShowForm(false);
    } catch (err) {
      setError('Failed to create note');
      console.error(err);
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      await updateNote(editingNote.id, noteData);
      await loadNotes();
      setEditingNote(null);
    } catch (err) {
      setError('Failed to update note');
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        await loadNotes();
      } catch (err) {
        setError('Failed to delete note');
        console.error(err);
      }
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleCancel = () => {
    setEditingNote(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Loading notes...</div>;
  }

  return (
    <div className="notes-app">
      <header className="app-header">
        <h1>My Notes</h1>
        <button
          onClick={() => setShowForm(true)}
          className="add-note-btn"
          disabled={showForm || editingNote}
        >
          + Add Note
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {(showForm || editingNote) && (
        <div className="form-container">
          <NoteForm
            note={editingNote}
            onSave={editingNote ? handleUpdateNote : handleCreateNote}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-state">
            <p>No notes yet. Create your first note!</p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDeleteNote}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;