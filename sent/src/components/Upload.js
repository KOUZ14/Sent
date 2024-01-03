import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
    setUploadProgress(0); // Reset progress when new files are selected
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }

      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      console.log('Files uploaded successfully:', response.data.fileUrls);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <h1>Multiple File Upload</h1>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload</button>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div>
          <p>Upload Progress: {uploadProgress}%</p>
          <progress value={uploadProgress} max="100" />
        </div>
      )}

      {uploadProgress === 100 && (
        <p>Upload complete!</p>
      )}
    </div>
  );
};

export default Upload;
