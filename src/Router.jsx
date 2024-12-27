import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KakaoLogin from './components/Login/Login';
import App from './App';
import ChatRoomItem from './components/ChatRoom/ChatRoomItem';  // ChatRoomItem은 components에 있음
import ChatRoomList from './pages/ChatRoom/ChatRoomList';  // 경로 수정
import ChatRoom from './pages/ChatRoom/ChatRoom';  // 경로 수정

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/login" element={<KakaoLogin />}></Route>
            {/* ChatRoomList는 pages 폴더 안에 있으므로 경로 수정 */}
            <Route path="/chat/rooms" element={<ChatRoomList />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />

            <Route path="/chatRoom" element={<ChatRoom />} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
