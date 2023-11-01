import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import axios from 'axios';
import Pagination from '../components/Pagination';

interface MenuItem {
  id: number;
  name: string;
  filial: {
    id: number;
    name: string;
  };
  tt: {
    id: number;
    name: string;
  };
  active: boolean;
  export: string[];
}

function Menu() {
  
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // Set the number of items per page

  useEffect(() => {
  

    axios
      .get(`https://testjob.checkport.ru/filial/1/menu/?limit=${itemsPerPage}&page=${currentPage}&filter=${filter}`)
      .then((response) => {
        setMenu(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching menu data:', error);
      });
  }, [filter, currentPage]);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <table>
        <thead>
          <tr>
            <th>
            <Filter text="Название меню" onFilterChange={handleFilterChange} />
            </th>
            <th>
            <Filter text="Филиал" onFilterChange={handleFilterChange} />
            </th>
            <th>
              <Filter text="Торговая точка" onFilterChange={handleFilterChange} />
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
          {menu.map((menuItem) => (
            <tr key={menuItem.id}>
              <td>{menuItem.name}</td>
              <td>{menuItem.filial.name}</td>
              <td>{menuItem.tt.name}</td>
              <td>{menuItem.active ? 'Активно' : 'Неактивно'}</td>
              <td>{menuItem.export.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalItems={menu.length} // Replace with the actual total number of items
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Menu;
