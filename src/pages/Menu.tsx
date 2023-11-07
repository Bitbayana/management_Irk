import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import { IMenu } from '../types/types';
import { useFilialContext } from '../components/FilialContext';

import modifySVG from '../icons/modify.svg';
import delSVG from '../icons/del.svg';
import statsSVG from '../icons/stats.svg';

function Menu() {
  const { filialId: contextFilialId } = useFilialContext();

  const itemsPerPage = 10;

  const [menu, setMenu] = useState<IMenu[]>([]);
  const [filterName, setFilterName] = useState<string>('');
  const [filterFilial, setFilterFilial] = useState<string>('');
  const [filterTT, setFilterTT] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>(''); // Добавлено состояние для статуса
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [originalData, setOriginalData] = useState<IMenu[]>([]);
  const [maxPages, setMaxPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filialIdToUse = contextFilialId || 1;
        const statusFilter = filterStatus === 'active' ? 'true' : filterStatus === 'inactive' ? 'false' : '';
        const response = await axios.get(
          `https://testjob.checkport.ru/filial/${filialIdToUse}/menu/?limit=${itemsPerPage}&page=${currentPage}&filterName=${filterName}&filterFilial=${filterFilial}&filterTT=${filterTT}&filterStatus=${statusFilter}`
        );
        const { max_pages, data } = response.data;

        setOriginalData(data);
        setMenu(data);
        setMaxPages(max_pages); 
        
        console.log('Request URL:', response);

      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchData();
  }, [currentPage, filterName, filterFilial, filterTT, filterStatus, contextFilialId]);

  useEffect(() => {
    const filteredData = originalData ? originalData.filter((menuItem) => {
      const nameMatch = menuItem.name.toLowerCase().includes(filterName.toLowerCase());
      const filialMatch = menuItem.filial.name.toLowerCase().includes(filterFilial.toLowerCase());
      const ttMatch = menuItem.tt.name.toLowerCase().includes(filterTT.toLowerCase());
      const statusMatch = filterStatus === '' || (filterStatus === 'active' && menuItem.active) || (filterStatus === 'inactive' && !menuItem.active);
      return nameMatch && filialMatch && ttMatch && statusMatch;
    }) : [];
  
    setMenu(filteredData);
    
  }, [filterName, filterFilial, filterTT, filterStatus, originalData]);

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

  const handleStatusChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="menu">
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
              <select className="branch--select" onChange={(e) => handleStatusChange(e.target.value)}>
                <option value="">Все</option>
                <option value="active">Активно</option>
                <option value="inactive">Неактивно</option>
              </select>
            </th>
            <th>Экспорт</th>
            <th>Функции</th>
          </tr>
        </thead>
        <tbody>
        {menu && menu.map((menuItem) => (
          <tr key={menuItem.id}>
            <td>{menuItem.name}</td>
            <td>{menuItem.filial.name}</td>
            <td>{menuItem.tt.name}</td>
            <td>{menuItem.active ? 'Активно' : 'Неактивно'}</td>
            <td>{menuItem.export.join(', ')}</td>
            <td>
              <div className='functions'>
                <button><img src={statsSVG} alt="del" width="30" height="30" /></button>
                <button><img src={modifySVG} alt="del" width="30" height="30" /></button>
                <button><img src={delSVG} alt="del" width="30" height="30" /></button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        maxPages={maxPages} 
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Menu;
