import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Menu from './pages/Menu';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

import './components/Sidebar.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Menu" element={<MenuWrapper />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

// Create a wrapper component to fetch selectedFilial and pass it as a prop
function MenuWrapper() {
  // Fetch the selectedFilial here, for example:
  const selectedFilial = "your_selected_filial_id"; // Replace with actual logic

  return <Menu filial_id={selectedFilial} />;
}

export default App;
