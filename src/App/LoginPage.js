import React, { useState } from 'react';
import MainPage from './MainPage.js';

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div>
      {isLoggedIn ? (
        <MainPage />
      ) : (
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
          <br />
          <button onClick={handleLogin}>Log in</button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;