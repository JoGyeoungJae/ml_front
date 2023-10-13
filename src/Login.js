import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function LoginForm() {
  const navigate = useNavigate();
  const [mname, setMname] = useState("");
  const [mtel, setMtel] = useState("");

  const formatPhoneNumber = (value) => {
    // 숫자 이외의 문자 제거
    const cleaned = value.replace(/\D/g, "");

    let formattedPhoneNumber = "";
    formattedPhoneNumber = cleaned;
    return formattedPhoneNumber;
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
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mname"></label>
          <input
            type="text"
            id="mname"
            value={mname}
            onChange={(e) => setMname(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="mtel"></label>
          <input
            type="tel"
            id="mtel"
            value={mtel}
            onChange={handlePhoneChange}
            placeholder="전화번호 숫자만 입력하세요 (예: 01012345678)"
          />
        </div>
        <div>
          <button type="submit">로그인</button>
          <button onClick={handleGoBack}>홈으로</button>
          <button onClick={register}>회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
