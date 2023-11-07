import { Routes, Route} from 'react-router-dom';

import Menu from './pages/Menu';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import './components/Sidebar.css';

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Menu" element={<Menu />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;