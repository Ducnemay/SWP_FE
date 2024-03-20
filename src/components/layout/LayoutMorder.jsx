import React from 'react';
import Header from '../../page/rolepage/moderatorPage/components/Header';
import { Outlet } from 'react-router-dom';

const LayoutMorder = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default LayoutMorder;