import React, { useState } from "react";
import "./Image.css";
import { useNavigate } from "react-router-dom";

function ImgUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [response, setResponse] = useState(""); // response 값을 상태로 관리

  const isLoggedIn = !!window.sessionStorage.getItem("user"); // "user" 데이터가 있으면 isLoggedIn은 true, 없으면 false
  // 로그인된 회원번호 확인하기
  if (isLoggedIn == true) {
    console.log("로그인 상태 mid=" + window.sessionStorage.getItem("user"));
  } else {
    console.log("로그아웃 상태");
  }

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

      //로그인되어있으면 유저번호, 안되어있으면 0을 보내기
      const loginStatus = isLoggedIn
        ? window.sessionStorage.getItem("user")
        : 0;
      formData.append("login", loginStatus);

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

  const logout = () => {
    window.sessionStorage.removeItem("user");
    // 세션 스토리지에서 "user" 데이터를 삭제하고
    // isLoggedIn 값도 false로 설정하여 로그아웃 버튼을 숨깁니다.
    navigate("/");
  };

  return (
    <div className="Image">
      <div className="paper">
        <h1>Seoul Landmark Scanner!</h1>
        <div className="imagebox">
          {previewImage && <img src={previewImage} alt="선택한 이미지" />}
        </div>
        <input type="file" accept="image/*" onChange={handleFileSelect} />
        <button onClick={handleUpload}>검색</button>
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={logout}>로그아웃</button>
        ) : (
          <button onClick={login}>로그인</button>
        )}
      </div>
    </div>
  );
}

export default ImgUpload;
