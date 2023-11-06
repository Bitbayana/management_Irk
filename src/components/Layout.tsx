import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import BranchDD from './BranchDD';
import Company from './Company';

function Layout() {
    const [filial_id, setFilial_id] = useState<number>(); 

  const handleFilialSelect = (selectedFilialId: number) => {
    setFilial_id(selectedFilialId);
    
  };
  console.log("ТЕКСТ В LAYOUT", filial_id);
  return (
    <div className="layout">
      <aside className="aside">
        <Company />
        <BranchDD onFilialSelect={handleFilialSelect} />
        
        <NavLink className="aside--li" to="/Components">Компоненты</NavLink>
        <NavLink className="aside--li" to="/SemiFinished">Полуфабрикаты</NavLink>
        <NavLink className="aside--li" to="/Products">Товары</NavLink>
        <NavLink className="aside--li" to="/Menu">Меню</NavLink> 
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