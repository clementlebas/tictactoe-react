import React from 'react';

const Square = props => {
  
  return (
    <button style={props.css} className="square" onClick={props.onClick} >
      {props.value}
    </button>
  );
}

export default Square;
