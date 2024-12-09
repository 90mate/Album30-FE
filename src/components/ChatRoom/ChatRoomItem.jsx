import React from 'react';

const ChatRoomItem = ({ roomId, seller, itemName, lastMessage, onEnterChatRoom }) => {
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">채팅방 {roomId}</h3>
            </div>
            <div className="panel-body">
                <p><strong>판매자:</strong> {seller}</p>
                <p><strong>물품명:</strong> {itemName}</p>
                <p><strong>마지막 메시지:</strong> {lastMessage}</p>
                <button className="btn btn-primary" onClick={() => onEnterChatRoom(roomId)}>
                    채팅방 입장
                </button>
            </div>
        </div>
    );
};

export default ChatRoomItem;
