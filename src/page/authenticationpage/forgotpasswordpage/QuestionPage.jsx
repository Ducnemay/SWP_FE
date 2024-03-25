import React from 'react';
import '../AuthenticationPage.css';

const QuestionPage = () => {
    return (
        <div className='authentication-section'>
            <a href='/log-in' className='homepage-link'> Về trang đăng nhập</a>
            <div className="authentication-container">
                <h2>Câu hỏi xác thực</h2>
                <form>
                    <div className="authentication-input-container">
                        <label htmlFor="question" className='authentication-input-container-label'>Câu hỏi</label>
                        <p id="question" name="question" className='authentication-input'>Câu hỏi</p>
                    </div>
                    <div className="authentication-input-container">
                        <label htmlFor="answer" className='authentication-input-container-label'>Trả lời</label>
                        <input type="text" id="answer" name="answer" className='authentication-input' required />
                    </div>

                    <button type="submit" className='authentication-button'>Xác nhận</button>
                </form>
            </div>
        </div>
    );
}

export default QuestionPage;

