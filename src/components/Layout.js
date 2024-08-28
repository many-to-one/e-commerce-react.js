import React from 'react';
import Header from './Header'; // Adjust the path based on your file structure

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
