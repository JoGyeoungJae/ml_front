import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [mname, setMname] = useState("");
  const [mtel, setMtel] = useState("");

  const formatPhoneNumber = (value) => {
    // 숫자 이외의 문자 제거
    const cleaned = value.replace(/\D/g, "");

    let formattedPhoneNumber = "";

    if (cleaned.length <= 3) {
      formattedPhoneNumber = cleaned;
    } else if (cleaned.length <= 10) {
      formattedPhoneNumber = `${cleaned.slice(0, 3)}-${cleaned.slice(
        3,
        6
      )}-${cleaned.slice(6, 10)}`;
    } else {
      formattedPhoneNumber = `${cleaned.slice(0, 3)}-${cleaned.slice(
        3,
        7
      )}-${cleaned.slice(7, 11)}`;
    }

    return formattedPhoneNumber;
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
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={mname}
            onChange={(e) => setMname(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <input
            type="tel"
            value={mtel}
            onChange={handlePhoneChange}
            placeholder="전화번호숫자만 입력하세요 (예: 010-1234-5678)"
          />
        </div>
        <div>
          <button type="submit">가입</button>
        </div>
      </form>
      <div className="buttons">
        <button onClick={handleGoBack}>홈으로</button>
        <button onClick={loginGo}>로그인</button>
      </div>
    </div>
  );
}

export default Register;
