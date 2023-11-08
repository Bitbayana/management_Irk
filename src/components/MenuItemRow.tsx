// MenuItemRow.tsx
import React from 'react';
import { IMenu } from '../types/types';
import modifySVG from '../icons/modify.svg';
import delSVG from '../icons/del.svg';
import statsSVG from '../icons/stats.svg';
type MenuItemRowProps = {
  menuItem: IMenu;
};

function MenuItemRow({ menuItem }: MenuItemRowProps) {
  return (
    <tr key={menuItem.id}>
      <td>{menuItem.name}</td>
      <td>{menuItem.filial.name}</td>
      <td>{menuItem.tt.name}</td>
      <td>{menuItem.active ? 'Активно' : 'Неактивно'}</td>
      <td>{menuItem.export.join(', ')}</td>
      <td>
        <div className="menu__functions">
          <button>
            <img src={statsSVG} alt="del" width="30" height="30" />
          </button>
          <button>
            <img src={modifySVG} alt="del" width="30" height="30" />
          </button>
          <button>
            <img src={delSVG} alt="del" width="30" height="30" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default MenuItemRow;
