import React, { useState } from 'react';
import './Feedback.css'

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [feedback, setFeedback] = useState('');

  const [feedbacks, setFeedbacks] = useState([
    // initial comments
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // submit comment to backend

    setFeedbacks([
      ...feedbacks, 
      {
        name,
        email,
        comment  
      }
    ]);

    setName('');
    setEmail('');
    setFeedback('');
  }

  return (
    <div className="feedback-section">
      <h3 className='feedback-heading'>Đánh giá sản phẩm</h3>

      <form className='feedback-form' onSubmit={handleSubmit}>

        <textarea className='feedback-form-content' value={feedback} onChange={e => setFeedback(e.target.value)} />

        <button className='feedback-form-button' type="submit">Gửi</button>

      </form>

      <div className="feedbacks">
        {feedbacks.map(feedback => (
          <CommentForm key={feedback.id}
            name={feedback.name}
            feedback={feedback.feedback} 
          />
        ))}
      </div>
    </div>
  )
}

function CommentForm({ name, feedback }) {
  return (
    <div className="feedback">
      <p>
        {name} - {feedback}  
      </p>
    </div>
  )
}

export default Feedback;
