import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [mname, setMname] = useState("");
  const [mtel, setMtel] = useState("");
  const lan = window.sessionStorage.getItem("language");
  const [language, setLanguage] = useState(lan); // 초기 언어 설정: 세션에 저장된정보

  const formatPhoneNumber = (value) => {
    // 숫자 이외의 문자 제거
    const cleaned = value.replace(/\D/g, "");

    let formattedPhoneNumber = "";
    formattedPhoneNumber = cleaned;

    return formattedPhoneNumber;
  };

  const toggleLanguage = () => {
    // 언어 변경 함수
    setLanguage(language === "ko" ? "en" : "ko");
    language === "ko"
      ? window.sessionStorage.setItem("language", "en")
      : window.sessionStorage.setItem("language", "ko");
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setMtel(formattedValue);
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { mname, mtel };

    // 간단한 유효성 검사
    if (!mname || !mtel) {
      alert("이름과 전화번호를 모두 입력해야 합니다.");
      return; // 제출 중단
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("등록 성공");
        setMname("");
        setMtel("");

        navigate("/login");
      } else {
        console.error("등록 실패");
      }
    } catch (error) {
      console.error("등록 요청 실패", error);
    }
  };

  const handleGoBack = () => {
    navigate("/"); // 홈
  };

  const loginGo = () => {
    navigate("/login"); // 로그인
  };

  return (
    <div className="register-container">
      <div className="language-links">
        <a onClick={toggleLanguage}>
          {language === "ko" ? "English" : "한국어"}
        </a>
      </div>
      <h2>{language === "ko" ? "회원가입" : "Sign up"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={mname}
            onChange={(e) => setMname(e.target.value)}
            placeholder={
              language === "ko" ? "이름을 입력하세요" : "Enter your name"
            }
          />
        </div>
        <div>
          <input
            type="tel"
            value={mtel}
            onChange={handlePhoneChange}
            placeholder={
              language === "ko"
                ? "전화번호를 입력하세요 (예: 01012345678)"
                : "Enter your phone number (ex: 01012345678)"
            }
          />
        </div>
        <div>
          <button type="submit">
            {" "}
            {language === "ko" ? "제출" : "Submit"}
          </button>
        </div>
      </form>
      <div className="buttons">
        <button onClick={handleGoBack}>
          {language === "ko" ? "홈으로" : "Home"}
        </button>
        <button onClick={loginGo}>
          {language === "ko" ? "로그인" : "Sign in"}
        </button>
      </div>
    </div>
  );
}

export default Register;
