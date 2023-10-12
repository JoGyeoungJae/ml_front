import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Landinfo.css";

function Landinfo() {
  const location = useLocation();
  const responseData = location.state && location.state.responseData;
  const [language, setLanguage] = useState("ko"); // 초기 언어 설정: 한국어

  useEffect(() => {
    // Spring Boot 서버의 홈 엔드포인트 호출
    fetch("http://localhost:8080/landinfo/1")
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
        console.log(responseData);
      })
      .catch((error) => console.error("서버 호출 오류:", error));
  }, []);

  const isLoggedIn = !!window.sessionStorage.getItem("user"); // "user" 데이터가 있으면 isLoggedIn은 true, 없으면 false
  // 로그인된 회원번호 확인하기
  if (isLoggedIn == true) {
    console.log("로그인 상태 mid=" + window.sessionStorage.getItem("user"));
  } else {
    console.log("로그아웃 상태");
  }

  const toggleLanguage = () => {
    // 언어 변경 함수
    setLanguage(language === "ko" ? "en" : "ko");
  };

  const getImagePath = (image, imagePath) => {
    return imagePath ? `${imagePath}${image}` : image;
  };

  return (
    <div className="container">
      {responseData ? (
        <div className="content">
          <div className="title-container">
            <div className="title">
              {language === "ko" ? responseData.nameKo : responseData.nameEn}
            </div>
            <div className="language-links">
              <a onClick={toggleLanguage}>
                {language === "ko" ? "English" : "한국어"}
              </a>
            </div>
          </div>
          <div className="main-image-container">
            <img
              className="main-image"
              src={
                process.env.PUBLIC_URL +
                getImagePath(responseData.mainImage, responseData.mainImagePath)
              }
              alt=""
            />
          </div>
          <div className="info-container">
            <p className="info">
              {language === "ko" ? "주소" : "Address"}:{" "}
              {language === "ko"
                ? responseData.addressKo
                : responseData.addressEn}
            </p>
            <p className="info">
              {language === "ko" ? "전화번호" : "Tel"}: {responseData.tel}
            </p>
          </div>

          {/* 이미지 표시 */}
          <div className="image-container">
            {responseData.subimage1 && (
              <div className="image-item-container">
                <img
                  className="image-item"
                  src={
                    process.env.PUBLIC_URL +
                    getImagePath(
                      responseData.subimage1,
                      responseData.subImage1Path
                    )
                  }
                  alt=""
                />
              </div>
            )}
            {responseData.subimage2 && (
              <div className="image-item-container">
                <img
                  className="image-item"
                  src={
                    process.env.PUBLIC_URL +
                    getImagePath(
                      responseData.subimage2,
                      responseData.subImage2Path
                    )
                  }
                  alt=""
                />
              </div>
            )}
            {responseData.subimage3 && (
              <div className="image-item-container">
                <img
                  className="image-item"
                  src={
                    process.env.PUBLIC_URL +
                    getImagePath(
                      responseData.subimage3,
                      responseData.subImage3Path
                    )
                  }
                  alt=""
                />
              </div>
            )}
            {responseData.subimage4 && (
              <div className="image-item-container">
                <img
                  className="image-item"
                  src={
                    process.env.PUBLIC_URL +
                    getImagePath(
                      responseData.subimage4,
                      responseData.subImage4Path
                    )
                  }
                  alt=""
                />
              </div>
            )}
            {responseData.subimage5 && (
              <div className="image-item-container">
                <img
                  className="image-item"
                  src={
                    process.env.PUBLIC_URL +
                    getImagePath(
                      responseData.subimage5,
                      responseData.subImage5Path
                    )
                  }
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="map-container">
            <div
              dangerouslySetInnerHTML={{ __html: responseData.mapUrl }}
            ></div>
          </div>

          {/* 설명 */}
          <div className="description-container">
            <p>
              {language === "ko" ? responseData.linfoKo : responseData.linfoEn}
            </p>
          </div>
        </div>
      ) : (
        <p>{language === "ko" ? "데이터가 없습니다." : "NO Data"}</p>
      )}
    </div>
  );
}

export default Landinfo;
