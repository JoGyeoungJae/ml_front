import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Landinfo.css";

function Landinfo() {
  const location = useLocation();
  const responseData = location.state && location.state.responseData;

  const lan = window.sessionStorage.getItem("language");
  const [language, setLanguage] = useState(lan); // 초기 언어 설정: 세션에 저장된정보

  console.log("랜드마크 페이지 : " + responseData);

  const isLoggedIn = !!window.sessionStorage.getItem("user"); // "user" 데이터가 있으면 isLoggedIn은 true, 없으면 false
  // 로그인된 회원번호 확인하기
  if (isLoggedIn === true) {
    console.log("로그인 상태 mid=" + window.sessionStorage.getItem("user"));
  } else {
    console.log("로그아웃 상태");
  }

  const toggleLanguage = () => {
    // 언어 변경 함수
    setLanguage(language === "ko" ? "en" : "ko");
    language === "ko"
      ? window.sessionStorage.setItem("language", "en")
      : window.sessionStorage.setItem("language", "ko");
  };

  const getImagePath = (image, imagePath) => {
    return imagePath ? `${imagePath}${image}` : image;
  };

  return (
    <div className="bigbox2">
      <div className="box11">
        <a onClick={toggleLanguage}>
          {language === "ko" ? "Change to English" : "한글로 변경"}
        </a>
      </div>
      <div className="box22"></div>

      <div className="box33">
        <div className="container2">
          {responseData ? (
            <div
              className="content2"
              style={{ maxHeight: "100%", overflowY: "scroll" }}
            >
              <div className="title-container">
                <div className="title">
                  {language === "ko"
                    ? responseData.nameKo
                    : responseData.nameEn}
                </div>
              </div>
              <div className="main-image-container">
                <img
                  className="main-image"
                  src={
                    process.env.PUBLIC_URL +
                    getImagePath(
                      responseData.mainImage,
                      responseData.mainImagePath
                    )
                  }
                  alt=""
                />
              </div>
              <div className="info-container">
                <p className="info">
                  {language === "ko" ? "주소" : "Address"}:
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
                  {language === "ko"
                    ? responseData.linfoKo
                    : responseData.linfoEn}
                </p>
              </div>
            </div>
          ) : (
            <p>{language === "ko" ? "데이터가 없습니다." : "NO Data"}</p>
          )}
        </div>
      </div>
      <div className="box44"></div>
      <div className="box55"></div>
    </div>
  );
}

export default Landinfo;
