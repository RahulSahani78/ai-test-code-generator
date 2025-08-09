
import React, { useEffect, useState } from 'react';
import { getRepoFiles } from '../services/githubService';

export default function FileSelector({ repo, onFilesSelected }) {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await getRepoFiles(repo.owner.login, repo.name, 'main');
        setFiles(res.data);
      } catch (err) {
        console.error('Error fetching files:', err);
      }
    };

    fetchFiles();
  }, [repo]);

  const handleFileToggle = (file) => {
    setSelectedFiles((prev) =>
      prev.includes(file)
        ? prev.filter((f) => f !== file)
        : [...prev, file]
    );
  };

  return (
    <div>
      <h4>Select Files in {repo.name}</h4>
      <ul className="list-group mb-3">
        {files.map((file) => (
          <li
            key={file.sha}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {file.path}
            <input
              type="checkbox"
              onChange={() => handleFileToggle(file)}
              checked={selectedFiles.includes(file)}
            />
          </li>
        ))}
      </ul>
      <button
        className="btn btn-success"
        onClick={() => onFilesSelected(selectedFiles)}
        disabled={selectedFiles.length === 0}
      >
        Submit Selected Files
      </button>
    </div>
  );
}
