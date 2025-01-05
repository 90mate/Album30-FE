import React from 'react';

const Modal = ({ notification, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>새로운 채팅 알림!</h2>
        <p>{notification.message}</p>
        <button onClick={onClose}>닫기</button>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }
        button {
          margin-top: 10px;
          padding: 10px 20px;
          border: none;
          background: #007bff;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Modal;
