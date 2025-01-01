import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // react-router-dom을 사용하여 링크 추가
import ChatRoomItem from '../../components/ChatRoom/ChatRoomItem';

const ChatRoomList = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const memberId = 5; // 실제 로그인된 사용자의 memberId를 동적으로 가져와야 합니다.

    useEffect(() => {
        axios.get('http://localhost:8080/chatRooms', {
            params: { memberId } // 쿼리 파라미터로 memberId 전달
        })
            .then(response => {
                // 응답 데이터 구조 확인 후 처리
                console.log("채팅방 목록 응답:", response.data);
                setChatRooms(response.data);  // 응답 데이터를 그대로 설정
                setLoading(false);
            })
            .catch(error => {
                console.error('채팅방 목록 불러오기 실패:', error);
                setError('채팅방 목록을 불러오는 중 문제가 발생했습니다.');
                setLoading(false);
            });
    }, [memberId]);

    const handleEnterChatRoom = (roomId) => {
        window.location.href = `/chat/${roomId}`;
    };

    if (loading) {
        return <div className="text-center">로딩 중...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <div className="container">
            <h1 className="text-center">채팅방 목록</h1>
            {chatRooms.length > 0 ? (
                chatRooms.map((room) => (
                    <div key={room.chatRoomId}>
                        {/* Link 컴포넌트를 사용하여 채팅방으로 이동 */}
                        <Link to={`/chat/${room.chatRoomId}`}>
                            <ChatRoomItem
                                roomId={room.chatRoomId}
                                seller={room.seller}
                                itemName={room.group + room.artist}
                                lastMessage={room.recentChat}
                            />
                        </Link>
                    </div>
                ))
            ) : (
                <div className="text-center">참여 중인 채팅방이 없습니다.</div>
            )}
        </div>
    );
};

export default ChatRoomList;
