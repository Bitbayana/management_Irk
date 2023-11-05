import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import BranchDD from './BranchDD';
import Company from './Company';

function Layout() {
  const [filial_id, setFilial_id] = useState<string>(''); // State to hold selected Filial ID

  const handleFilialSelect = (selectedFilialId: string) => {
    setFilial_id(selectedFilialId);
  };

  return (
    <div className="layout">
      <aside className="aside">
        <Company />
        <BranchDD onFilialSelect={handleFilialSelect} /> {/* Pass the callback function */}
        
        <NavLink className="aside--li" to="/Components">Компоненты</NavLink>
        <NavLink className="aside--li" to="/SemiFinished">Полуфабрикаты</NavLink>
        <NavLink className="aside--li" to="/Products">Товары</NavLink>
        <NavLink className="aside--li" to="/Menu">Меню</NavLink> {/* Change to "/Menu" instead of "Menu" */}
        <NavLink className="aside--li" to="/Movements">Перемещения</NavLink>
        <NavLink className="aside--li" to="/Inventory">Инвентаризация</NavLink>
        <NavLink className="aside--li" to="/Release">Выпуск товара</NavLink>
        <NavLink className="aside--li" to="/WriteOff">Списание</NavLink>
        <NavLink className="aside--li" to="/Waybills">Накладные</NavLink>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
