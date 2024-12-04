import React, { useEffect, useState } from 'react';

const KakaoLogin = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Kakao 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('2ff3b2f6c6ffeebf692f150ce2133460');
    }

    // 쿠키에서 토큰 읽기 및 상태 설정
    const storedToken = getCookie('authorize-access-token');
    if (storedToken) {
      window.Kakao.Auth.setAccessToken(storedToken);
      window.Kakao.Auth.getStatusInfo()
        .then((res) => {
          if (res.status === 'connected') {
            setToken(window.Kakao.Auth.getAccessToken());
          }
        })
        .catch(() => {
          window.Kakao.Auth.setAccessToken(null);
        });
    }
  }, []);

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:8080/auth/kakao',
    });
  };

  const getCookie = (name) => {
    const parts = document.cookie.split(`${name}=`);
    if (parts.length === 2) {
      return parts[1].split(';')[0];
    }
    return null;
  };

  return (
    <div>
      <a id="kakao-login-btn" href="#" onClick={loginWithKakao}>
        <img
          src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="222"
          alt="카카오 로그인 버튼"
        />
      </a>
      <p id="token-result">
        {token ? `Login success, token: ${token}` : 'Not logged in'}
      </p>
    </div>
  );
};

export default KakaoLogin;
