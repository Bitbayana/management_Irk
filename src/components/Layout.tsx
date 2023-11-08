import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import BranchDD from './BranchDD';
import Company from './Company';
import { FilialProvider } from './FilialContext';

function Layout() {
    const [filial_id, setFilial_id] = useState<number>(); 

  const handleFilialSelect = (selectedFilialId: number) => {
    setFilial_id(selectedFilialId);
  };
 
  const navigationLinks = [
    { to: '/Components', text: 'Компоненты' },
    { to: '/SemiFinished', text: 'Полуфабрикаты' },
    { to: '/Products', text: 'Товары' },
    { to: '/Menu', text: 'Меню' },
    { to: '/Movements', text: 'Перемещения' },
    { to: '/Inventory', text: 'Инвентаризация' },
    { to: '/Release', text: 'Выпуск товара' },
    { to: '/WriteOff', text: 'Списание' },
    { to: '/Waybills', text: 'Накладные' },
  ];
  
  return (
    <FilialProvider>
      <div className="layout">
        <aside className="aside">
          <Company />
          <BranchDD onFilialSelect={handleFilialSelect} />
          {navigationLinks.map((link) => (
            <NavLink key={link.to} className="aside__li" to={link.to}>
              {link.text}
            </NavLink>
          ))}
        </aside>
        <main className="main">
          <Outlet />
        </main>
      </div>
  </FilialProvider>
  );
}

export default Layout;