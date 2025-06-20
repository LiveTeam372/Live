import React, { useState } from 'react';
import "../../styles/common.css";
import logo from '../../images/live-logo_.png';
import axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import UserDetailForm from './UserDetailForm';

import common from '../../resources/common.js';

const Join = ({ setView }) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [isAgent, setIsAgent] = useState(false);

  let [gbCd, setGbCd] = useState('1');

  // 이메일 상태값
  const [isValidEmail, setIsValidEmail] = useState(false); // ✅ 메시지가 정상인지 여부
  const [messageEmail, setMessageEmail] = useState('');

  // 비밀번호 상태값
  const [isValidPw, setIsValidPw] = useState(false); // ✅ 메시지가 정상인지 여부
  const [messagePw, setMessagePw] = useState('');

  // 비밀번호 확인 상태값
  const [isValidPw2, setIsValidPw2] = useState(false); // ✅ 메시지가 정상인지 여부
  const [messagePw2, setMessagePw2] = useState('');

  const [messageJoin, setMessageJoin] = useState('');

  // 이메일 유효성 체크
  const checkEmail = async (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!common.isValidEmail(value)) {
      setMessageEmail("올바른 이메일 형식이며 30자 이내여야 합니다.");
      setIsValidEmail(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:16543/user/chekedEmail.do', {
        email: value  // value를 보내야 함!
      });

      // 서버에서 중복이면 false, 사용 가능하면 true 반환했다고 가정
      if (res.data.available) {
        setMessageEmail("사용 가능한 이메일입니다.");
        setIsValidEmail(true);
      } else {
        setMessageEmail("이미 사용 중인 이메일입니다.");
        setIsValidEmail(false);
      }
    } catch (err) {
      setMessageEmail("서버 오류 발생");
      setIsValidEmail(false);
    }
  };

  // 비밀번호 체크
  const checkPw = (e) => {
    const value = e.target.value;
    setPw(value);
    if (!common.isValidPassword(value)) {
      setMessagePw("영어, 숫자, 특수문자 포함 8자리 이상이어야 합니다.");
      setIsValidPw(false);
    } else {
      setMessagePw("");
      setIsValidPw(true);
    }
  }

  // 비밀번호 일치 여부
  const isEqualPw = (e) => {
    const value = e.target.value;
    setPw2(value);
    if(pw !== value) {
      // 비밀번호 일치 확인
      setMessagePw2("비밀번호가 일치하지 않습니다.");
      setIsValidPw2(false);
    } else {
      setMessagePw2("비밀번호가 일치합니다.");
      setIsValidPw2(true);
    }
  }

  const agentCheck = (e) => {
    setIsAgent(e.target.checked);
    if (e.target.checked) {
      console.log("체크 됨!");
      setGbCd("2");
    } else {
      console.log("체크 해제 됨!");
      setGbCd("1");
    }
  }

  // 회원 가입
  const userJoin = async (e) => {
    e.preventDefault();
    console.log("회원가입 진행");

    if(isValidEmail && isValidPw && isValidPw2) {
      try {
        const res = await axios.post('http://localhost:16543/user/join.do', {
          email,
          pw,
          gbCd
        });
      
        // 인증메일 전송
        const resMail = await axios.post('http://localhost:16543/user/sendAuthNum.do', {
          email
        });
        console.log("인증번호 이메일 전송 완료", resMail.data);        

      alert("회원가입이 정상적으로 완료되었습니다.");
      setView({ name: "EmailAuth", email });

      } catch (err) {
        console.error("회원가입 또는 이메일 전송 중 오류 발생", err);
        alert("문제가 발생했습니다. 다시 시도해 주세요.");
      }
    } else {
      alert("입력하신 정보를 확인해 주세요.");
      return false;
    }

  };


  return (
    <div className='container'>
      <div className='row' style={{paddingTop:'50px'}}>
        <div className='col-2' style={{width:'300px', marginTop: '1rem', marginBottom: '3rem', fontSize: "20px" }}>
          <div className='' style={{margin: '0px'}}>
            <img src={logo} style={{width:'130px', height:'130px'}}></img>
          </div>
          <div style={{marginLeft: '20px'}}>
            <span>
              회원가입을 통해서<br/>
              <strong>다양한 매물을 확인하세요.</strong>
            </span>
          </div>
          <div style={{marginLeft: '20px', marginTop: '30px'}}>
            <span onClick={() => setView("LoginUser")}>← 로그인하러 가기</span>
          </div>
        </div>
        <div className="join-container col-8">
          <div className="join-box">
            <h3 style={{textAlign:'center'}}>회원가입</h3>
            <form onSubmit={userJoin}>
              <input type='hidden' name="gbCd" value="1"></input>
              <div className="input-group">
                <label>이메일</label>
                <input 
                  type="text" 
                  required 
                  placeholder="이메일 입력" 
                  name="email"
                  onChange={checkEmail}
                />
                <span className={isValidEmail ? 'msg-success' : 'msg-error'}>{messageEmail}</span>
              </div>
              <div className="input-group">
                <label>비밀번호</label>
                <input 
                  type="password" 
                  required 
                  placeholder="비밀번호 입력"
                  name="pw"
                  onChange={checkPw}
                />
                <span className={isValidPw ? 'msg-success' : 'msg-error'}>{messagePw}</span>
              </div>
              <div className="input-group">
                <label>비밀번호 확인</label>
                <input 
                  type="password" 
                  required 
                  placeholder="비밀번호 확인"
                  name="pw2"
                  onChange={isEqualPw}
                />
                <span className={isValidPw2 ? 'msg-success' : 'msg-error'}>{messagePw2}</span>
              </div>
              <button type="submit" className="login-button">회원가입</button>
              <span className='msg-error'>{messageJoin}</span>
              
              <div className="login-box-footter" style={{justifyItems:"center",alignItems:"center"}}>
                <input type="checkbox" className='m-3' style={{width: "20px", height: "20px"}} onChange={agentCheck}></input>
                <span style={{justifyItems:"center",alignItems:"center"}}>중개인 회원으로 가입하기 </span>
              </div>
            </form>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
    </div>
  );
}

export default Join;