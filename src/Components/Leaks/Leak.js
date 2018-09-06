import React from 'react';

export default props => {
  return (
    <div className="card leak">
      <div className="card-header w-100">
        <img className="img-fluid w-100" src={props.leak.image} alt="leak" />
      </div>
      <div className="card-body">
        <h2>{props.leak.title}</h2>
        <p className="lead">{props.leak.date}</p>
        <p>
          {props.leak.description.substring(0, 153)}
          ... READ MORE <i className="fas fa-arrow-circle-right" />
        </p>
      </div>
    </div>
  );
};
