import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BackToTop from '../BackToTop/BackToTop';
import PromotionPopup from '../PromotionPopup/PromotionPopup';

const UserLayout = () => {
  return (
    <div className="app">
      <PromotionPopup />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default UserLayout;
