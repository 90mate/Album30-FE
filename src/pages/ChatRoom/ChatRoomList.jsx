import React, { useState, useEffect } from 'react';
import ChatRoomItem from '../../components/ChatRoom/ChatRoomItem';

const ChatRoomList = () => {
    const [chatRooms, setChatRooms] = useState([]);

    // API에서 채팅방 목록을 가져오는 예시
    useEffect(() => {
        // 예시 API 호출 (실제로는 axios나 fetch를 사용)
        fetch('/api/chatrooms')
            .then(response => response.json())
            .then(data => setChatRooms(data));
    }, []);

    const handleEnterChatRoom = (roomId) => {
        // 채팅방 입장 처리 (URL 변경 또는 다른 동작)
        window.location.href = `/chat/${roomId}`;
    };

    return (
        <div className="container">
            <h1 className="text-center">채팅방 목록</h1>
            {chatRooms.map((room) => (
                <ChatRoomItem
                    key={room.chatRoomId}
                    roomId={room.chatRoomId}
                    seller={room.seller}
                    itemName={room.itemName}
                    lastMessage={room.lastMessage}
                    onEnterChatRoom={handleEnterChatRoom}
                />
            ))}
        </div>
    );
};

export default ChatRoomList;
