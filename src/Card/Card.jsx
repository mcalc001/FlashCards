import React from 'react';

import './Card.css';

const Card = ({question, answer}) => {
	return (
  <div className="card-container">
	    <div className="card"> 
		      <div className="front" > 
		         <div className="qestion">{question}</div> 
		      </div>
		      <div className="back" > 
		       <div className="answer">{answer}</div>
		   </div>
	  </div> 
 </div>
)}

export default Card;