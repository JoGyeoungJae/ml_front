import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 서버로 로그인 요청을 보내거나, 로컬 상태를 확인할 수 있습니다.
    // 예를 들어, 사용자 이름과 비밀번호가 "admin"과 "password"인 경우에만 로그인 성공으로 처리합니다.
    if (formData.username === "admin" && formData.password === "password") {
      alert("로그인 성공");
    } else {
      alert("로그인 실패. 사용자 이름과 비밀번호를 확인하세요.");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">이름:</label>
          <input
            type="text"
            value={mname}
            onChange={(e) => setMname(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="password">핸드폰 번호:</label>
          <input
            type="tel"
            value={mtel}
            onChange={handlePhoneChange}
            placeholder="전화번호숫자만 입력하세요 (예: 010-1234-5678)"
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
