import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@components/shared/Header/Header.jsx';
import Footer from '@components/shared/Footer/Footer.jsx';
import BackToTop from '@components/shared/BackToTop/BackToTop.jsx';
import { Suspense } from 'react';
import routes from '@routes/index.route.jsx';
import Loading from '@components/shared/Loading/Loading.jsx';
import PromotionPopup from '@components/shared/PromotionPopup/PromotionPopup.jsx';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <PromotionPopup />
        <div className="app">
          
          <Header />

          
          <main className="main-content">
            <Routes>
              
              {routes.map((route, index) => (
                <Route 
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>

          
        
          </main>

        
          <Footer />

        
          <BackToTop />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;