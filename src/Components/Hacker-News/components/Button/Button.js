import React from 'react';

const Button = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
};

export default Button;
