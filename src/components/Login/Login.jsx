import React from 'react';

const KakaoLogin = ({ location }) => {
  console.log('Rendering KakaoLogin...');
  return (
    <div
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '200px auto',
      }}
    >
      <h1>카카오 로그인</h1>
      <a href={location}>
        <img src = "/assets/icon/kakao_login.png" alt="Kakao Login" />
      </a>
    </div>
  );
};

export default KakaoLogin;