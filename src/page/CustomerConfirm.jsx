import React, { useState } from 'react';
import './CustomerConfirm.css';

function ResponseCustomerPage() {
  // Giả sử danh sách các response được lấy từ API hoặc được truyền vào từ props
  const [responseList, setResponseList] = useState([
    { id: 1, creator: 'Creator 1', response: 'Response 1', confirmed: false },
    { id: 2, creator: 'Creator 2', response: 'Response 2', confirmed: false },
    { id: 3, creator: 'Creator 3', response: 'Response 3', confirmed: false },
  ]);

  const handleConfirm = (id) => {
    // Xác nhận một response dựa trên id
    setResponseList((prevList) =>
      prevList.map((response) =>
        response.id === id ? { ...response, confirmed: true } : response
      )
    );
  };

  return (
    <div className="response-require-list">
      <h2>Response List</h2>
      <ul>
        {responseList.map((response) => (
          <li key={response.id}>
            <div>Creator: {response.creator}</div>
            <div>Response: {response.response}</div>
            {!response.confirmed && (
              <button onClick={() => handleConfirm(response.id)}>Confirm</button>
            )}
            {response.confirmed && <div>Confirmed</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResponseCustomerPage;
