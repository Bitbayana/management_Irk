import React, { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { IMenu } from '../types/types';

interface MenuProps {
    filial_Id: number; 
  }

function Menu({ filial_Id }: MenuProps) { 
  const [menu, setMenu] = useState<IMenu[]>([]);
  const [filterName, setFilterName] = useState<string>('');
  const [filterFilial, setFilterFilial] = useState<string>('');
  const [filterTT, setFilterTT] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

 
  const [originalData, setOriginalData] = useState<IMenu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(
          `https://testjob.checkport.ru/filial/${filial_Id}/menu/?limit=${itemsPerPage}&page=${currentPage}&filterName=${filterName}&filterFilial=${filterFilial}&filterTT=${filterTT}`
        );
        const { max_pages, data } = response.data;

        setOriginalData(data);
        setMenu(data);
        setTotalItems(max_pages * itemsPerPage);
        console.log('Request URL:', response);
      } catch (error) {
        console.error('Error fetching menu data:', error);
        
      }
    };

    fetchData();
  }, [currentPage, filterName, filterFilial, filterTT, filial_Id]);


  useEffect(() => {
    
    const filteredData = originalData.filter((menuItem) => {
      const nameMatch = menuItem.name.toLowerCase().includes(filterName.toLowerCase());
      const filialMatch = menuItem.filial.name.toLowerCase().includes(filterFilial.toLowerCase());
      const ttMatch = menuItem.tt.name.toLowerCase().includes(filterTT.toLowerCase());
      return nameMatch && filialMatch && ttMatch;
    });

    setMenu(filteredData);
    setTotalItems(filteredData.length);
  }, [filterName, filterFilial, filterTT, originalData]);

  const handleFilterChange = (value: string, field: string) => {
    if (field === 'Название меню') {
      setFilterName(value);
    } else if (field === 'Филиал') {
      setFilterFilial(value);
    } else if (field === 'Торговая точка') {
      setFilterTT(value);
    }
    setCurrentPage(1);
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
              <Filter text="Название меню" onFilterChange={(value) => handleFilterChange(value, 'Название меню')} />
            </th>
            <th>
              <Filter text="Филиал" onFilterChange={(value) => handleFilterChange(value, 'Филиал')} />
            </th>
            <th>
              <Filter text="Торговая точка" onFilterChange={(value) => handleFilterChange(value, 'Торговая точка')} />
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
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Menu;