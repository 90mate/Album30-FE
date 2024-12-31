/*
// // ======================================================
import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // useParams 훅을 사용하여 URL 파라미터 추출

const ChatRoom = () => {
  const { roomId } = useParams(); // URL에서 roomId 가져오기
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);  // 메시지 상태
  const [messageContent, setMessageContent] = useState('');
  const [chatRoomInfo, setChatRoomInfo] = useState({ chatRoomId: '', type: '' });

  const userId = 2;

  // STOMP 클라이언트 연결 및 구독 설정
  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws-stomp',
      onConnect: () => {
        setConnected(true);
        subscribeToChatRoom();
        fetchChatRoomInfo();
        fetchChatHistory();
      },
      onStompError: (error) => {
        console.error('Error:', error);
      },
    });

    setStompClient(client);
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  // 채팅방에 메시지 구독
  const subscribeToChatRoom = () => {
    if (stompClient && connected) {
      stompClient.subscribe(`/room/${roomId}`, (message) => {
        const chat = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, chat]);  // 새로운 메시지 추가
      });
    }
  };

  // 채팅방 정보 가져오기
  const fetchChatRoomInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/chat/${roomId}`);
      setChatRoomInfo({
        chatRoomId: response.data.chatRoomId,
        type: response.data.type,
      });
    } catch (error) {
      console.error('Error fetching chat room info:', error);
    }
  };

  // 채팅 기록 가져오기
  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/chat/${roomId}/history`);
      setMessages(response.data || []);  // 기존 채팅 기록 설정
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // 메시지 전송
  const sendMessage = () => {
    if (!messageContent.trim()) {
      alert('Message cannot be empty.');
      return;
    }

    if (!connected) {
      alert('STOMP connection is not established.');
      return;
    }

    const message = {
      senderId: userId,
      message: messageContent,
      chatRoomId: roomId,
      type: 'message', // Example type
    };

    // 메시지 전송
    stompClient.publish({
      destination: `/app/${roomId}`,
      body: JSON.stringify(message),
    });

    // 메시지를 상태에 추가하여 화면에 새 메시지 반영
    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId: userId, message: messageContent, type: 'message' }
    ]);

    setMessageContent(''); // 메시지 전송 후 입력란 비우기
  };

  // 빠른 메시지 버튼 핸들러
  const handleQuickMessage = (type) => {
    switch (type) {
      case 'photoVideo':
        sendMessage('📷 Shared a photo/video', 'photoVideo');
        break;
      case 'account':
        sendMessage('💳 Shared bank account info', 'account');
        break;
      case 'address':
        sendMessage('📍 Shared an address', 'address');
        break;
      case 'report':
        sendMessage('⚠️ Shared report history', 'report');
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Chat Room</h1>


      <div id="chat-room-info" className="well">
        <h3>Room Details</h3>
        <p><strong>Chat Room ID:</strong> {chatRoomInfo.chatRoomId}</p>
        <p><strong>Type:</strong> {chatRoomInfo.type}</p>
      </div>

      <div id="chat-history" className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Chat History</h3>
        </div>
        <div className="panel-body">
          <ul id="history-list" className="list-group">
            {messages.length > 0 ? (
              messages.map((chat, index) => (
                <li key={index} className="list-group-item">
                  <strong>{chat.senderId}:</strong> {chat.message}
                  <span className="text-muted"> ({chat.type})</span>
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No chat history available.</li>
            )}
          </ul>
        </div>
      </div>


      <div className="row">
        <div className="col-md-12">
          <form id="send-message-form" className="form-inline" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="message-content">Message:</label>
              <input
                type="text"
                id="message-content"
                className="form-control"
                placeholder="Type your message here"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </div>
            <button id="send-message" className="btn btn-primary" type="button" onClick={sendMessage}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

// // ===============================================================
*/
// ChatRoom.js
import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  const { roomId } = useParams(); // URL에서 roomId 가져오기
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [chatRoomInfo, setChatRoomInfo] = useState({ chatRoomId: '', type: '' });

  const userId = 2;

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws-stomp',
      onConnect: () => {
        setConnected(true);
        subscribeToChatRoom();
        fetchChatRoomInfo();
        fetchChatHistory();
      },
      onStompError: (error) => {
        console.error('Error:', error);
      },
    });

    setStompClient(client);
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  const subscribeToChatRoom = () => {
    if (stompClient && connected) {
      stompClient.subscribe(`/room/${roomId}`, (message) => {
        const chat = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, chat]);
      });
    }
  };

  const fetchChatRoomInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/chat/${roomId}`);
      setChatRoomInfo({
        chatRoomId: response.data.chatRoomId,
        type: response.data.type,
      });
    } catch (error) {
      console.error('Error fetching chat room info:', error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/chat/${roomId}/history`);
      setMessages(response.data || []);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const sendMessage = (content, type = 'MESSAGE') => {
    if (!content.trim()) {
      alert('Message cannot be empty.');
      return;
    }

    if (!connected) {
      alert('STOMP connection is not established.');
      return;
    }

    const message = {
      senderId: userId,
      message: content,
      chatRoomId: roomId,
      type,
    };

    stompClient.publish({
      destination: `/app/${roomId}`,
      body: JSON.stringify(message),
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId: userId, message: content, type },
    ]);
  };

 // 빠른 메시지 버튼 핸들러
const handleQuickMessage = async (type) => {
  let message = '';
  
  try {
    // URL에 icon과 memberId를 쿼리 파라미터로 전달
    const response = await  await fetch(`http://localhost:8080/quickChat/${type}?memberId=${userId}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.text();  // 백엔드에서 문자열로 반환하므로 text()로 처리
      message = data;  // 받은 메시지를 변수에 저장
    } else {
      message = '요청에 실패했습니다. 다시 시도해주세요.';
    }
  } catch (error) {
    console.error('Error:', error);
    message = '서버 오류가 발생했습니다.';
  }

  // 메시지를 화면에 출력
  sendMessage(message, type);
};


  return (
    <div className="container">
      <h1 className="text-center">Chat Room</h1>

      {/* Chat Room Information */}
      <div id="chat-room-info" className="well">
        <h3>Room Details</h3>
        <p><strong>Chat Room ID:</strong> {chatRoomInfo.chatRoomId}</p>
        <p><strong>Type:</strong> {chatRoomInfo.type}</p>
      </div>

      {/* Chat History */}
      <div id="chat-history" className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Chat History</h3>
        </div>
        <div className="panel-body">
          <ul id="history-list" className="list-group">
            {messages.length > 0 ? (
              messages.map((chat, index) => (
                <li key={index} className="list-group-item">
                  <strong>{chat.senderId}:</strong> {chat.message}
                  <span className="text-muted"> ({chat.type})</span>
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No chat history available.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Quick Messages */}
      <div className="quick-messages">
        <button className="btn btn-info" onClick={() => handleQuickMessage('PHOTOVIEDEO')}>
          📷 Photo/Video
        </button>
        <button className="btn btn-info" onClick={() => handleQuickMessage('ACCOUNT')}>
          💳 Share Account
        </button>
        <button className="btn btn-info" onClick={() => handleQuickMessage('ADDRESS')}>
          📍 Share Address
        </button>
        <button className="btn btn-info" onClick={() => handleQuickMessage('REPORT')}>
          ⚠️ Report History
        </button>
      </div>

      {/* Send Message Form */}
      <div className="row">
        <div className="col-md-12">
          <form id="send-message-form" className="form-inline" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="message-content">Message:</label>
              <input
                type="text"
                id="message-content"
                className="form-control"
                placeholder="Type your message here"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </div>
            <button
              id="send-message"
              className="btn btn-primary"
              type="button"
              onClick={() => sendMessage(messageContent)}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
