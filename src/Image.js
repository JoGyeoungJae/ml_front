import React, { useState } from "react";
import "./Image.css";
import { useNavigate } from "react-router-dom";

function ImgUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [response, setResponse] = useState(""); // response 값을 상태로 관리

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  const navigate = useNavigate();
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      // 서버로 이미지를 POST 요청으로 전송
      fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("서버에서 받은 응답:", data);
          const responseData = data;
          setResponse(responseData); // response 값을 상태로 업데이트

          navigate("/landinfo", { state: { responseData } });
        })
        .catch((error) => {
          console.error("업로드 및 처리 중 오류 발생:", error);
        });
    }
  };
  const login = () => {
    navigate("/login");
  };
  return (
    <div className="Image">
      <div className="backwhite">
        <h1 className="one">LandMark Scanner</h1>
        <div className="imagebox one">
          {previewImage && <img src={previewImage} alt="선택한 이미지" />}
        </div>
        <input
          className="one"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <button className="one" onClick={handleUpload}>
          검색
        </button>
      </div>
      <button className="login" onClick={login}>
        로그인
      </button>
    </div>
  );
}

export default ImgUpload;
