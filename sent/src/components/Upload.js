import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      // Append each selected file to the formData
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }

      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Files uploaded successfully:', response.data.fileUrls);
    } catch (error) {
      console.error('Error uploading files:', error.message);
    }
  };

  return (
    <div>
      <h1>Multiple File Upload</h1>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
