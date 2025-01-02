import React from "react";
import "../static/resources/css/Login.css";
import AuthAPI from "../api/AuthAPI";

const Login = () => {

  const clickLogin = async (data) => {
    try {
      const response = await AuthAPI.Login(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Stockids</h1>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            placeholder="아이디"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            className="input-field"
          />
        </div>

        <div className="form-group checkbox-group">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">로그인 상태 유지</label>
        </div>

        <button type="submit" className="login-button">
          로그인
        </button>

        <div className="link-group">
          <a href="/forgot-password" className="link">
            비밀번호를 잊으셨나요?
          </a>
          <br />
          <a href="/signup" className="link">
            아직 회원이 아니신가요? 가입하기
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
