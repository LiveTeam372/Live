import React, { useState } from 'react';
import "../../styles/common.css";
import logo from '../../images/live-logo_.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailAuth = ({ setView, email }) => {

  // 인증번호 입력 상태값
  const [isAuthNum, setIsAuthNum] = useState(false); // ✅ 메시지가 정상인지 여부
  const [messageAuthNum, setMessageAuthNum] = useState('');

  const [authNum, setAuthNum] = useState('');

  const navigate = useNavigate();

  // 인증번호 정규식
  const isValidPassword = (value) => {
    const regex = /^\d{6}$/;
    return regex.test(value);
  };

  // 인증번호 유효성체크
  const checkAuthNum = (e) => {
    const value = e.target.value;
    setAuthNum(value);

    if (isValidPassword(value)) {
      setMessageAuthNum("");
      if (value.length === 6) {
        setMessageAuthNum("");
        setIsAuthNum(true);
      } else {
        setMessageAuthNum("인증번호 6자리여야 합니다.");
        setIsAuthNum(false);
      }
    } else {
      setMessageAuthNum("숫자만 입력해야 합니다.");
      setIsAuthNum(false);
    }
    return;
  };

  // 이메일 재전송
  const reSendEmail = async (e) => {
    e.preventDefault();

    try {
      const resMail = await axios.post('http://localhost:16543/user/sendAuthNum.do', {
        email
      });
      console.log("인증번호 이메일 전송 완료", resMail.data);        

    } catch (err) {
      console.error("이메일 전송 중 오류 발생", err);
      alert("문제가 발생했습니다. 다시 시도해 주세요.");
    }
  }

  // 이메일 인증
  const emailAuth = async (e) => {
    e.preventDefault();

    console.log("authEmail :: " + email);
    console.log("authEmail :: " + authNum);

    try {
      const res = await axios.post('http://localhost:16543/user/authEmail.do', {
        email,
        authNum
      });

      if (res.data.result === "success") {
        alert("이메일 인증이 완료되었습니다!");
        navigate('/'); // 리다이렉트
      } else {
        setMessageAuthNum("인증번호가 올바르지 않습니다.");
        setIsAuthNum(false);
        return false;
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
      return false;
    }
      
  };

  return (
    <div className='container'>
      <div className='row' style={{paddingTop:'50px'}}>
        <div className='col-2' style={{width:'300px', cursor: 'pointer', marginTop: '1rem', marginBottom: '3rem', fontSize: "20px" }}>
          <div className='' style={{margin: '0px'}}>
            <img src={logo} style={{width:'130px', height:'130px'}}></img>
          </div>
          <div style={{marginLeft: '20px'}}>
            <span>
              이메일 인증으로<br/>
              <strong>모든 서비스를 누리세요!</strong>
            </span>
          </div>
        </div>
        <div className="join-container col-8">
          <div className="join-box">
            <h3 style={{textAlign:'center'}}>이메일 인증</h3>
            <div style={{textAlign:'center', marginTop: "20px"}}>
              <span>
                가입하신 이메일로 인증번호를 발송했습니다.
                <br/><strong>인증번호를 입력해 주세요!</strong>
              </span>
              <h6 style={{marginTop: "30px", marginBottom: "30px"}}>- {email} -</h6>
            </div>
            <form onSubmit={emailAuth}>
              <div className="input-group">
                <input 
                  type="text" 
                  required 
                  placeholder="인증번호 입력" 
                  name="authNum"
                  maxLength={"6"}
                  onChange={(checkAuthNum)}
                />
                <span className={isAuthNum ? 'msg-success' : 'msg-error' }>{messageAuthNum}</span>
              </div>
              
              <button type="submit" className={"login-button" }>인증 완료</button>
              <span className='msg-error'></span>
              
            </form>
            <div className="login-box-footter">
              <span onChange={(e) => reSendEmail()}> → 인증 메일 재발송</span>
            </div>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
    </div>
  );
}

export default EmailAuth;