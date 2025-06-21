import React, { useState } from 'react';
import "../styles/common.css";

import MyPageComponent from "../components/user/MyPage.js";

const MyPage = ({setUser, user }) => {
  const [view, setView] = useState('MyPage');

  const [email, setEmail] = useState({ name: "login", email: "" });

  return (
    <div style={{background:'#EDE7DC'}}>
      <>
      {view === "MyPage" && <MyPageComponent setView={setView} />}
      </>
    </div>
  );
}

export default MyPage;