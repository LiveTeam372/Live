import React, { useState } from 'react';
import "../../styles/common.css";
import logo from '../../images/live-logo_.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Join from "../user/Join.js";
import EmailAuth from "../user/EmailAuth.js";

const LoginUser = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // 로그인
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("userName :: " + email);
    console.log("password :: " + pw);

    try {
      const res = await axios.post('http://localhost:16543/user/login.do', 
      { email, pw});
      
      console.log("res.loginUser.emailAuth :: " + JSON.stringify(res.data.emailAuthYN));
      // 이메일 인증 여부
      if (res.data.emailAuthYN === "N") {
        alert("로그인 되었습니다. 이메일 인증을 완료해 주세요.");
        setView({ name: "EmailAuth", email: res.data.email });
      } else {
        alert("로그인 되었습니다.");
        navigate('/'); // 리다이렉트
      }
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage('서버 오류 발생');
      }
    }
  };

  return (
    <div className="login-container">
      <div className='login-top-area flex-area' style={{margin: '0px'}}>
        <img src={logo} style={{width:'100px', height:'100px'}}></img>
      </div>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>이메일</label>
            <input 
              type="text" 
              required 
              placeholder="이메일 입력" 
              name="email"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <label>비밀번호</label>
            <input 
              type="password" 
              required 
              placeholder="비밀번호 입력"
              name="pw"
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">로그인</button>
          <span className='err-txt'>{message}</span>
        </form>
        <div className="login-box-footter">
          <span>아이디 찾기</span> /
          <span>비밀번호 찾기</span> /
          <span onClick={() => setView('join')}>회원가입</span>
        </div>
      </div>
      <div className='login-text-area flex-area'>
        <span>간편하게 로그인하고<br/>
        <strong>다양한 서비스를 이용하세요.</strong></span>
      </div>
      <div className='login-bottom-area flex-area'>
        <button type='button' className='kakao-login-btn'>카카오톡으로 로그인</button>
      </div>
    </div>
  );
}

export default LoginUser;