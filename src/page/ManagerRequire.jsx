import React, { useState } from 'react';
import './ManagerRequire.css';
import api from "../components/utils/requestAPI";
import useAuth from "../hooks/useAuth";

const ManagementRequire=()=> {
  // Tạo danh sách các mẫu đợi được demo
  

  // Tạo danh sách các mẫu đã hoàn thành
  const [completedSamples, setCompletedSamples] = useState([]);

  // Hàm xử lý khi demo một mẫu
  const handleDemo = (id) => {
    // Tìm mẫu cần demo trong danh sách đợi
    const sample = waitingSamples.find(sample => sample.id === id);
    // Xóa mẫu đó khỏi danh sách đợi
    setWaitingSamples(waitingSamples.filter(sample => sample.id !== id));
    // Thêm mẫu vào danh sách đã hoàn thành với trạng thái 'Hoàn thành'
    setCompletedSamples([...completedSamples, { ...sample, status: 'Succesfully' }]);
  };

  // Render danh sách mẫu
  const renderSampleList = (samples, title) => {
    return (
      <div className="sample-list">
        <h2>{title}</h2>
        <ul>
          {samples.map(sample => (
            <li key={sample.id}>
              <span>{sample.name}</span>
              <span>{sample.status}</span>
              {title === 'Manager Order Require' && <button onClick={() => handleDemo(sample.id)}>Confirm</button>}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="management-require-container">
      {renderSampleList(waitingSamples, 'Manager Order Require')}
      {renderSampleList(completedSamples, 'Succesfully')}
    </div>
  );
}

export default ManagementRequire;
