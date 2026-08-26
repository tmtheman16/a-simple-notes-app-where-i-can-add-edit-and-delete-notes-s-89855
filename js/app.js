document.addEventListener('DOMContentLoaded', () => {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const folders = JSON.parse(localStorage.getItem('folders')) || [];
  const syncStatus = document.getElementById('syncStatus');

  // Render notes and folders
  function renderNotes() {
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';
    notes.forEach(note => {
      const noteCard = document.createElement('div');
      noteCard.classList.add('bg-white', 'rounded-md', 'shadow-sm', 'p-4', 'mb-4');
      noteCard.innerHTML = `
        <h3 class="text-lg font-bold">${note.title}</h3>
        <p>${note.content}</p>
        <button class="bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-hover mt-2">Edit</button>
        <button class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-2">Delete</button>
      `;
      notesContainer.appendChild(noteCard);
    });
  }

  function renderFolders() {
    const foldersContainer = document.getElementById('folders');
    foldersContainer.innerHTML = '';
    folders.forEach(folder => {
      const folderCard = document.createElement('div');
      folderCard.classList.add('bg-white', 'rounded-md', 'shadow-sm', 'p-4', 'mb-4');
      folderCard.innerHTML = `
        <h3 class="text-lg font-bold">${folder.name}</h3>
        <p>${notes.filter(note => note.folder_id === folder.id).length} notes</p>
        <button class="bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-hover mt-2">Edit</button>
        <button class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-2">Delete</button>
      `;
      foldersContainer.appendChild(folderCard);
    });
  }

  // Add note
  document.getElementById('noteForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const folder = document.getElementById('folder').value;
    const note = {
      id: crypto.randomUUID(),
      title,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      folder_id: folder
    };
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    document.getElementById('noteForm').reset();
  });

  // Render initial data
  renderNotes();
  renderFolders();

  // Sync status
  syncStatus.textContent = 'Offline';
  setInterval(() => {
    syncStatus.textContent = 'Online';
  }, 1000);
});
