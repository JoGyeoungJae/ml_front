import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function LoginForm() {
  const navigate = useNavigate();
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
  const handleGoBack = () => {
    navigate("/"); // 뒤로 가기
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 폼 데이터를 준비
    const formData = {
      mname: mname,
      mtel: mtel,
    };

    try {
      // 서버로 POST 요청을 보냄
      const response = await axios.post(
        "http://localhost:8080/login",
        formData
      );

      if (response.data !== null) {
        console.log("로그인 성공 로그인 폼에서: " + response.data.mid);

        window.sessionStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      } else {
        console.log("로그인 실패: ");
        alert("로그인 실패. 사용자 이름과 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error("오류 발생: ");
      alert("로그인 실패. 사용자 이름과 비밀번호를 확인하세요.");
    }
  };

  const register = () => {
    navigate("/register");
  };
  return (
    <div className="login-container">
      <div className="language-links">
        <a onClick={toggleLanguage}>
          {language === "ko" ? "English" : "한국어"}
        </a>
      </div>
      <h2>{language === "ko" ? "로그인" : "Sign in"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mname"></label>
          <input
            type="text"
            id="mname"
            value={mname}
            onChange={(e) => setMname(e.target.value)}
            placeholder={
              language === "ko" ? "이름을 입력하세요" : "Enter your name"
            }
          />
        </div>
        <div>
          <label htmlFor="mtel"></label>
          <input
            type="tel"
            id="mtel"
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
            {language === "ko" ? "로그인" : "Sign in"}
          </button>
          <button onClick={handleGoBack}>
            {language === "ko" ? "홈으로" : "Home"}
          </button>
          <button onClick={register}>
            {language === "ko" ? "회원가입" : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
