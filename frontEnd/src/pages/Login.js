import React, { useState } from 'react';
import "../styles/common.css";

import LoginUser from "../components/user/LoginUser.js";
import Join from "../components/user/Join.js";
import EmailAuth from "../components/user/EmailAuth.js";

const Login = () => {
  const [view, setView] = useState('LoginUser');

  const [email, setEmail] = useState({ name: "login", email: "" });

  return (
    <div style={{background:'#EDE7DC'}}>
      <>
      {view === "LoginUser" && <LoginUser setView={setView} />}
      {view === "Join" && <Join setView={setView} />}
      {view.name === "EmailAuth" && <EmailAuth email={view.email} />}
      </>
    </div>
  );
}

export default Login;