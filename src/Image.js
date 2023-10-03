import React, { useState } from 'react';
import './Image.css'

function ImgUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      // 서버로 이미지를 POST 요청으로 전송
      fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('서버에서 받은 응답:', data);
        })
        .catch((error) => {
          console.error('업로드 및 처리 중 오류 발생:', error);
        });
    }
  };

  return (
    <div className="Image">
      <h1>이미지 업로드</h1>
      <input type="file" accept="image/*" onChange={handleFileSelect} />
      <button onClick={handleUpload}>업로드</button>
    </div>
  );
}

export default ImgUpload;
