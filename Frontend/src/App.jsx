import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Collections from './pages/Collections';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-primary shadow-md sticky top-0 z-50">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              Himtaj
            </Link>
            <div>
              <Link to="/collections" className="text-white hover:text-primary-light-light font-semibold transition">
                Collections
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/collections" element={<Collections />} />
            <Route path="/" element={
              <div className="text-center p-10 md:p-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-dark">Welcome to Himtaj</h1>
                <p className="text-lg md:text-xl text-text-light mb-8">Discover our exclusive collection of fine jewelry.</p>
                <Link 
                  to="/collections" 
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
                >
                  Shop Now
                </Link>
              </div>
            } />
          </Routes>
        </main>
        
        <footer className="bg-text-dark text-white p-6 text-center">
          <p>&copy; {new Date().getFullYear()} Himtaj. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
