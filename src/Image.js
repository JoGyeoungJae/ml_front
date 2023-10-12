import React, { useState, useEffect } from "react";
import "./Image.css";
import { useNavigate, Link } from "react-router-dom";

function ImgUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [response, setResponse] = useState(""); // response 값을 상태로 관리
  const [responseListData, setResponseListData] = useState([]);

  useEffect(() => {
    // Spring Boot 서버의 홈 엔드포인트 호출
    fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((data) => {
        const responseListData = data;
        setResponseListData(responseListData); // response 값을 상태로 업데이트
        console.log(responseListData);
      })
      .catch((error) => console.error("서버 호출 오류:", error));
  }, []);
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
  const register = () => {
    navigate("/register");
  };
  return (
    <div className="containermain">
      <div className="image">
        <div className="paper">
          <h1>Seoul Landmark Scanner!</h1>
          <div>사진을 업로드 하면 해당 랜드마크를 검색합니다.</div>
          <div>
            <button className="login" onClick={login}>
              로그인
            </button>
            <button className="register" onClick={register}>
              회원가입
            </button>
          </div>
          <div className="imagebox">
            {previewImage && <img src={previewImage} alt="선택한 이미지" />}
          </div>
          <input type="file" accept="image/*" onChange={handleFileSelect} />
          <button onClick={handleUpload}>검색</button>
        </div>
        <div className="paper">
          <div>검색 리스트</div>
          <div className="listbox">
            {responseListData.map((item, index) => (
              <div key={index} className="list-item">
                <div className="member-info">
                  <Link to={`/landinfo/${item.landInfo.lid}`}>
                    {item.landInfo.nameKo}
                  </Link>
                </div>
                <div className="member-info">
                  {item.member ? item.member : "비회원"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImgUpload;
