import React, { useState, useEffect } from "react";
import "./Image.css";
import { useNavigate, Link } from "react-router-dom";

function ImgUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [response, setResponse] = useState(""); // response 값을 상태로 관리
  const [responseListData, setResponseListData] = useState([]);

  // lan의 초기값을 "en"으로 설정
  const lan = "en";
  // 이미 sessionStorage에 "language" 키가 설정되어 있다면 그 값을 사용
  const storedLanguage = window.sessionStorage.getItem("language");
  const initialLanguage = storedLanguage || lan;
  // useState로 초기 언어 설정
  const [language, setLanguage] = useState(initialLanguage);

  const [filteredList, setFilteredList] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const userString = window.sessionStorage.getItem("user"); // "user" 키의 값을 가져옵니다.
  const user = JSON.parse(userString); // JSON 문자열을 파싱하여 JavaScript 객체로 변환합니다.

  useEffect(() => {
    // Spring Boot 서버의 홈 엔드포인트 호출
    fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((data) => {
        const responseListData = data;
        setResponseListData(responseListData); // response 값을 상태로 업데이트
        console.log(responseListData);

        // responseListData 배열을 필터링하여 member가 null이 아니면서 만 추출
        if (user !== null) {
          const filteredList = responseListData.filter(
            (item) => item.member !== null && item.member.mid === user.mid
          );
          setFilteredList(filteredList);
          console.log(filteredList);
        }
      })
      .catch((error) => console.error("서버 호출 오류:", error));
  }, []);

  const isLoggedIn = !!window.sessionStorage.getItem("user"); // "user" 데이터가 있으면 isLoggedIn은 true, 없으면 false
  // 로그인된 회원번호 확인하기
  if (isLoggedIn === true) {
    console.log("로그인 상태 mid=" + user.mid);
  } else {
    console.log("로그아웃 상태");
  }

  const handleShowAllData = () => {
    if (displayedData.length > 0) {
      // 현재 데이터가 표시 중이면, 숨기기 위해 데이터를 비웁니다.
      setDisplayedData([]);
    } else {
      // 현재 데이터가 표시되지 않는 경우, 전체 목록을 표시합니다.
      setDisplayedData(responseListData);
    }
  };

  const handleShowMyData = () => {
    if (displayedData.length > 0) {
      // 현재 데이터가 표시 중이면, 숨기기 위해 데이터를 비웁니다.
      setDisplayedData([]);
    } else {
      // 현재 데이터가 표시되지 않는 경우, 필터링된 목록을 표시합니다.
      setDisplayedData(filteredList);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(file);
      const container = document.querySelector(".message");
      if (container) {
        container.remove();
      }
    } else {
      setPreviewImage(null);
    }
  };
  const navigate = useNavigate();
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      //로그인되어있으면 유저번호, 안되어있으면 null을 보내기
      const loginStatus = isLoggedIn ? user.mid : null;
      formData.append("login", loginStatus);

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
    } else {
      console.log("파일없음");
      const messageDiv = document.createElement("div");
      messageDiv.textContent = "파일을 선택해주세요";
      messageDiv.classList.add("message");

      const container = document.querySelector(".imagebox");

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      container.appendChild(messageDiv);
    }
  };
  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };
  const golandmark = (index) => {
    console.log(index);
    console.log(JSON.stringify(responseListData[index]));
    const responseData = responseListData[index].landInfo;
    setResponse(responseData); // response 값을 상태로 업데이트

    navigate("/landinfo", { state: { responseData } });
  };
  const logout = () => {
    window.sessionStorage.removeItem("user");
    // 세션 스토리지에서 "user" 데이터를 삭제하고
    // isLoggedIn 값도 false로 설정하여 로그아웃 버튼을 숨깁니다.
    window.location.reload();
  };
  const toggleLanguage = () => {
    // 언어 변경 함수
    setLanguage(language === "ko" ? "en" : "ko");
    language === "ko"
      ? window.sessionStorage.setItem("language", "en")
      : window.sessionStorage.setItem("language", "ko");
  };
  const del = (index) => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?"); // 확인 대화상자 표시

    if (confirmed) {
      const slid = JSON.stringify(responseListData[index].slid);
      console.log("사용자가 확인을 눌렀습니다." + slid);
      // 삭제 요청을 보내거나 다른 삭제 작업을 수행할 수 있습니다.
      fetch(`http://localhost:8080/del?index=${slid}`, {
        method: "POST",
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          const updatedList = [...displayedData];
          updatedList.splice(index, 1);
          setDisplayedData(updatedList);
        })
        .catch((error) => {
          console.error("업로드 및 처리 중 오류 발생:", error);
        });
    } else {
      console.log("사용자가 취소를 눌렀습니다.");
      // 사용자가 삭제를 취소한 경우 수행할 작업을 여기에 추가할 수 있습니다.
    }
  };

  return (
    <div className="bigbox">
      <div className="box1">
          
          <div className="language">
            <a onClick={toggleLanguage}>
              {language === "ko" ? "English" : "한국어"}
            </a>
          </div>

          <div className="text1">
            {language === "ko"
              ? "서울 랜드마크 스캐너!"
              : "Seoul Landmark Scanner!"}
          </div>
          <div className="text2">
            {language === "ko"
              ? "사진을 업로드 하면 해당 랜드마크를 검색합니다."
              : "When you upload a photo, it searches for the corresponding landmark."}
          </div>
          

          
          
          <div className="loginout">
            {isLoggedIn ? (
              <button className="register" onClick={logout}>
                {language === "ko" ? "로그아웃" : "Logout"}
              </button>
            ) : (
              <>
                <button className="register" onClick={login}>
                  {language === "ko" ? "로그인" : "Login"}
                </button>
                <button className="register" onClick={register}>
                  {language === "ko" ? "회원가입" : "Sign up"}
                </button>
              </>
            )}
          </div>
        
      </div>
      <div className="box2"></div>

      <div className="imagebox">
        {previewImage && <img src={previewImage} alt="선택한 이미지" />}
      </div>

      <div className="box4"></div>
      <div className="box5">
        <span className="p1">
          <input
            type="file"
            className="file-input"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </span>
        <button onClick={handleUpload}>
          {language === "ko" ? "검색" : "Search"}
        </button>
        <div>
          <button className="button2" onClick={handleShowAllData}>
            {language === "ko" ? "전체검색목록" : "Full Search List"}
          </button>
          {isLoggedIn && (
            <button className="button2" onClick={handleShowMyData}>
              {language === "ko" ? "나의검색목록" : "My Search List"}
            </button>
          )}
        </div>
        <div
          className="listbox"
          style={{ maxHeight: "15vh", overflowY: "scroll" }}
        >
          {displayedData.map((item, index) => (
            <div key={index} className="list-item">
              <div className="member-titleinfo">
                <span onClick={() => golandmark(index)}>
                  {language === "ko"
                    ? item.landInfo.nameKo
                    : item.landInfo.nameEn}
                </span>
              </div>
              {item.member ? (
                <div key={item.landInfo.lid} className="member-nameinfo">
                  {item.member.mname}
                </div>
              ) : (
                <div key={item.landInfo.lid} className="member-nameinfo">
                  {language === "ko" ? "비회원" : "guest"}
                </div>
              )}
              {user !== null && user.role === "ADMIN" && (
                <div className="member-xinfo">
                  <img
                    className="x-image"
                    src={process.env.PUBLIC_URL + "/img/x.png"}
                    alt=""
                    onClick={() => del(index)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImgUpload;
