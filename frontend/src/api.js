// use relative URL so requests go through the nginx proxy when deployed
const API_BASE_URL = '/api';

export const getNotes = async () => {
  const response = await fetch(`${API_BASE_URL}/notes/`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return response.json();
};

export const createNote = async (noteData) => {
  let options = { method: 'POST' };

  // if noteData contains a File object, send as FormData
  if (noteData.attachment instanceof File) {
    const form = new FormData();
    form.append('title', noteData.title);
    form.append('description', noteData.description);
    form.append('attachment', noteData.attachment);
    options.body = form;
  } else {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(noteData);
  }

  const response = await fetch(`${API_BASE_URL}/notes/`, options);
  if (!response.ok) {
    throw new Error('Failed to create note');
  }
  return response.json();
};

export const updateNote = async (id, noteData) => {
  let options = { method: 'PUT' };

  if (noteData.attachment instanceof File) {
    const form = new FormData();
    form.append('title', noteData.title);
    form.append('description', noteData.description);
    form.append('attachment', noteData.attachment);
    options.body = form;
  } else {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(noteData);
  }

  const response = await fetch(`${API_BASE_URL}/notes/${id}/`, options);
  if (!response.ok) {
    throw new Error('Failed to update note');
  }
  return response.json();
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
};