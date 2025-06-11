import React, { useState } from 'react';
import "../../styles/common.css";
import logo from '../../images/live-logo_.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailAuth = ({ setView, email }) => {

  // 인증번호 입력 상태값
  const [isAuthNum, setIsAuthNum] = useState(false); // ✅ 메시지가 정상인지 여부
  const [messageAuthNum, setMessageAuthNum] = useState('');

  return (
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
          <form >
            <div className="input-group">
              <input 
                type="text" 
                required 
                placeholder="인증번호 입력" 
                name="authNum"
                onChange={(setIsAuthNum)}
              />
              <span className={isAuthNum ? 'msg-success' : 'msg-error'}>{messageAuthNum}</span>
            </div>
            
            <button type="submit" className="login-button">인증 완료</button>
            <span className='msg-error'></span>
            
          </form>
          <div className="login-box-footter">
            <span> > 인증 메일 재발송</span>
          </div>
        </div>
      </div>
      <div className='col-2'></div>
    </div>
  );
}

export default EmailAuth;