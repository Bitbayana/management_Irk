import React from 'react';
import { Routes,  Route} from 'react-router-dom';

import Menu from './pages/Menu';
import NotFound from './pages/NotFound';
import Laoyut from './components/Layout';

import "./components/Sidebar.css"

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Laoyut />}>
            <Route path="Menu" element={<Menu />}> </Route>
            <Route path="*" element={<NotFound />}> </Route>
          </Route>
        </Routes>
    </>
  );
}

export default App;
