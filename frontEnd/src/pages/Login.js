import React, { useState } from 'react';
import "../styles/common.css";

import LoginUser from "../components/user/LoginUser.js";
import Join from "../components/user/Join.js";
import EmailAuth from "../components/user/EmailAuth.js";
import UserDetailForm from "../components/user/UserDetailForm.js";
import JoinAgent from "../components/user/JoinAgent.js";

const Login = ({setUser, user }) => {
  const [view, setView] = useState('LoginUser');

  const [email, setEmail] = useState({ name: "login", email: "" });

  return (
    <div style={{background:'#EDE7DC'}}>
      <>
      {view === "LoginUser" && <LoginUser setView={setView} setUser={setUser} user={user} />}
      {view === "Join" && <Join setView={setView} />}
      {view.name === "EmailAuth" && <EmailAuth email={view.email} setView={setView} />}
      {view.name === "UserDetailForm" && <UserDetailForm setView={setView} />}
      {view === "JoinAgent" && <JoinAgent setView={setView} />}
      </>
    </div>
  );
}

export default Login;