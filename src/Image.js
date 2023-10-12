import React, { useState, useEffect } from "react";
import "./Image.css";
import { useNavigate, Link } from "react-router-dom";

function ImgUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [response, setResponse] = useState(""); // response 값을 상태로 관리
  const [responseListData, setResponseListData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    // Spring Boot 서버의 홈 엔드포인트 호출
    fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((data) => {
        const responseListData = data;
        setResponseListData(responseListData); // response 값을 상태로 업데이트
        console.log(responseListData);

        // responseListData 배열을 필터링하여 member가 null이 아니면서 만 추출
        const filteredList = responseListData.filter(
          (item) =>
            item.member !== null &&
            item.member.mid ===
              parseInt(window.sessionStorage.getItem("user"), 10)
        );
        setFilteredList(filteredList);
        console.log(filteredList);
      })
      .catch((error) => console.error("서버 호출 오류:", error));
  }, []);

  const isLoggedIn = !!window.sessionStorage.getItem("user"); // "user" 데이터가 있으면 isLoggedIn은 true, 없으면 false
  // 로그인된 회원번호 확인하기
  if (isLoggedIn === true) {
    console.log("로그인 상태 mid=" + window.sessionStorage.getItem("user"));
  } else {
    console.log("로그아웃 상태");
  }

  const handleShowAllData = () => {
    setDisplayedData(responseListData);
  };

  const handleShowMyData = () => {
    setDisplayedData(filteredList);
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

  const logout = () => {
    window.sessionStorage.removeItem("user");
    // 세션 스토리지에서 "user" 데이터를 삭제하고
    // isLoggedIn 값도 false로 설정하여 로그아웃 버튼을 숨깁니다.
    navigate("/");
  };

  return (
    <div className="containermain">
      <div className="image">
        <div className="paper">
          <h1>Seoul Landmark Scanner!</h1>
          <div>사진을 업로드 하면 해당 랜드마크를 검색합니다.</div>
          <div>
            {isLoggedIn ? (
              <button className="register" onClick={logout}>
                로그아웃
              </button>
            ) : (
              <button className="register" onClick={login}>
                로그인
              </button>
            )}
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
          <div>
            <button onClick={handleShowAllData}>전체검색목록</button>
            <button onClick={handleShowMyData}>나의검색목록</button>
          </div>
          <div className="listbox">
            {displayedData.map((item, index) => (
              <div key={index} className="list-item">
                <div className="member-info">
                  <Link to={`/landinfo/${item.landInfo.lid}`}>
                    {item.landInfo.nameKo}
                  </Link>
                </div>
                {item.member ? (
                  <div key={item.landInfo.lid} className="member-info">
                    {item.member.mname}
                  </div>
                ) : (
                  <div key={item.landInfo.lid} className="member-info">
                    비회원
                  </div>
                )}
                <div className="member-info x-info">
                  <img
                    className="x-image"
                    src={process.env.PUBLIC_URL + "/img/x.png"}
                    alt=""
                  />
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
