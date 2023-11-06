import { Routes, Route, useParams } from 'react-router-dom';

import Menu from './pages/Menu';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

import './components/Sidebar.css';

function App() {
  const { filial_Id } = useParams<{ filial_Id: string }>(); // Указываем ожидаемый тип параметра
  const selectedBranchId = filial_Id ? parseInt(filial_Id, 10) : 1;
  console.log("ТЕКСТ В app", selectedBranchId, filial_Id);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Menu" element={<Menu filial_Id={selectedBranchId} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;