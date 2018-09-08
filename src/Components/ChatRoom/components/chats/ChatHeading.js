import React from 'react';

export default function({ name, numberOfUsers, logout }) {
  return (
    <div className="chat-header">
      <div className="user-info">
        <div className="user-name">{name}</div>
        <div className="status">
          <div className="indicator" />
          <span>{numberOfUsers ? numberOfUsers : null}</span>
        </div>
      </div>
      <div>
        <i
          className="fas fa-sign-out-alt"
          onClick={() => {
            logout();
          }}
          title="Logout"
        />
      </div>
    </div>
  );
}
