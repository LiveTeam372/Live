import React, { useState } from 'react';
import "../styles/common.css";

import MyPageUser from "../components/user/MyPageUser.js";
import MyPageAgent from "../components/user/MyPageAgent.js";
import { useNavigate } from 'react-router-dom';

const MyPage = ({setUser, user }) => {

  const navigate = useNavigate();

  // 로그인 유저 정보
  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData) {
    alert("로그인 후 이용 가능합니다.");
    navigate('/'); // 리다이렉트
  }
  const userType = userData.gbCd;
  const [email, setEmail] = useState({ name: "login", email: "" });
  
  let viewType = "";
  if(userType === "1") viewType = "MyPageUser";
  else viewType = "MyPageAgent";

  const [view, setView] = useState(viewType);
  
  return (
    <div style={{background:'#EDE7DC'}}>
      <>
        {view === "MyPageUser" && <MyPageUser setView={setView} />}
        {view === "MyPageAgent" && <MyPageAgent setView={setView} />}
      </>
    </div>
  );
}

export default MyPage;