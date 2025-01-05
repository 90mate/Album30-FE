import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Modal from './components/Modal/Modal';  // Modal 컴포넌트 임포트

function App() {
  const [notification, setNotification] = useState(null); // 알림 상태
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  useEffect(() => {
    const memberId = 6; // 사용자 ID
    const eventSource = new EventSource(`http://localhost:8080/notifications/connect?memberId=${memberId}`);

    // 서버에서 새 알림 이벤트를 수신
    eventSource.addEventListener('newChat', (event) => {
      const data = JSON.parse(event.data);
      setNotification(data); // 알림 데이터를 상태로 저장
      setShowModal(true); // 모달 표시
    });

    // SSE 에러 처리
    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close(); // 컴포넌트 언마운트 시 SSE 연결 종료
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>💙 우리의 첫 React 프로젝트 💙</p>
        <Button variant="primary">부트스트랩 버튼 테스트</Button>{' '}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* 모달 알림 */}
      {showModal && notification && (
        <Modal
          notification={notification}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';
// import {Button} from 'react-bootstrap'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           💙 우리의 첫 React 프로젝트 💙
//         </p>
//         <Button variant="primary">부트스트랩 버튼 테스트</Button>{' '}
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
