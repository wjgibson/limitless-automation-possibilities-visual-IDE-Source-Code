import React, { useState } from 'react';
import MainPage from './MainPage.js';

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  return (
    <div>
      {isLoggedIn ? (
        <MainPage />
      ) : (
        <button onClick={handleLogin}>Log in</button>
      )}
    </div>
  );
}

export default LoginPage;