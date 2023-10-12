import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
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

  const handleGoBack = () => {
    navigate(-1); // 뒤로 가기
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

      if (response.data !== null && response.data !== "로그인 실패") {
        console.log("로그인 성공: " + response.data);

        window.sessionStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      } else {
        console.log("로그인 실패: " + response.data.message);
        alert("로그인 실패. 사용자 이름과 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error("오류 발생: " + error.message);
      alert("로그인 실패. 사용자 이름과 비밀번호를 확인하세요.");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mname">이름:</label>
          <input
            type="text"
            value={mname}
            onChange={(e) => setMname(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="mtel">핸드폰 번호:</label>
          <input
            type="tel"
            value={mtel}
            onChange={handlePhoneChange}
            placeholder="전화번호 숫자만 입력하세요 (예: 010-1234-5678)"
          />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
      </form>
      <button onClick={handleGoBack}>뒤로 가기</button>
    </div>
  );
}

export default LoginForm;
