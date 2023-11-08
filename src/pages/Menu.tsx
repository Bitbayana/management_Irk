import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Pagination from '../components/Pagination';
import { IMenu } from '../types/types';
import { useFilialContext } from '../components/FilialContext';
import config from '../config/config';
import MenuFilter from '../components/MenuFilter';
import MenuItemRow from '../components/MenuItemRow';

function Menu(): JSX.Element {
  const { filialId: contextFilialId } = useFilialContext();
  const [menu, setMenu] = useState<IMenu[]>([]);
  const [filterName, setFilterName] = useState<string>('');
  const [filterFilial, setFilterFilial] = useState<string>('');
  const [filterTT, setFilterTT] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [originalData, setOriginalData] = useState<IMenu[]>([]);
  const [maxPages, setMaxPages] = useState<number>(1);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filialIdToUse = contextFilialId || 1;
        const statusFilter = filterStatus === 'active' ? 'true' : filterStatus === 'inactive' ? 'false' : '';
        const response = await axios.get(
          `${config.API_BASE_URL}/filial/${filialIdToUse}/menu/?limit=${config.ITEMS_PER_PAGE}&page=${currentPage}&filterName=${filterName}&filterFilial=${filterFilial}&filterTT=${filterTT}&filterStatus=${statusFilter}`
        );

        if (response.status === 204) {
          console.log('Данные не найдены');
        } else if (response.status === 400) {
          console.error('Описание ошибки:', response.data.message);
        } else if (response.status === 422) {
          console.error('Ошибка валидации:', response.data.detail);
        } else if (response.status === 500) {
          console.error('Внутренняя ошибка сервера:', response.data);
        } else {
          const { max_pages, data } = response.data;
          setOriginalData(data);

          // Фильтрация данных
          let filteredData = [...data];
          if (filterName) {
            filteredData = filteredData.filter((item) =>
              item.name.toLowerCase().includes(filterName.toLowerCase())
            );
          }
          if (filterFilial) {
            filteredData = filteredData.filter((item) =>
              item.filial.name.toLowerCase().includes(filterFilial.toLowerCase())
            );
          }
          if (filterTT) {
            filteredData = filteredData.filter((item) =>
              item.tt.name.toLowerCase().includes(filterTT.toLowerCase())
            );
          }
          if (statusFilter) {
            filteredData = filteredData.filter((item) =>
              (item.active && statusFilter === 'true') || (!item.active && statusFilter === 'false')
            );
          }

          setMenu(filteredData);
          setMaxPages(max_pages);
          console.log('Request URL:', response.config.url);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.error('Axios error:', axiosError.response?.data || axiosError.message);
        } else {
          console.error('An error occurred:', error);
        }
      }
    };

    fetchData();
  }, [currentPage, filterName, filterFilial, filterTT, filterStatus, contextFilialId]);

  return (
    <div className="menu">
      <table>
        <MenuFilter onFilterChange={handleFilterChange} onStatusChange={handleStatusChange} />
        <tbody>
          {menu.map((menuItem) => (
            <MenuItemRow key={menuItem.id} menuItem={menuItem} />
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
