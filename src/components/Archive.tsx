import React from 'react';
import noteService from '../services/notes';
import './Archive.global.css';

const ArchiveButton = ({ weekTitle }: { weekTitle: string }) => {
  const handleArchive = () => {
    noteService.archiveNotes(weekTitle);
    window.location.reload();
  };

  return (
    <div id="archive_button">
      <button type="button" onClick={handleArchive}>
        Archive
      </button>
    </div>
  );
};

export default ArchiveButton;
