import React from 'react';
import Filter from '../components/Filter';

function Menu() {
  return (
    <div className="">
      <table>
        <thead>
          <tr>
            <th>
              <Filter text="Название меню" />
            </th>
            <th>
              <Filter text="Филиал" />
            </th>
            <th>
            <Filter text="Торговая точка" />
            </th>
            <th>
              <select className="branch--select">
                <option>Активно</option>
                <option>Неактивно</option>
              </select>
            </th>
            <th>Экспорт</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Какое меню 1</td>
            <td>Западная Москва река и лодка 1</td>
            <td>Сушу кручу</td>
            <td>Активно</td>
            <td>Яндекс</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Menu;
