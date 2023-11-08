import Filter from '../components/Filter';

type MenuFilterProps = {
  onFilterChange: (value: string, field: string) => void;
  onStatusChange: (value: string) => void;
};

function MenuFilter({ onFilterChange, onStatusChange }: MenuFilterProps) {
  return (
    <thead>
      <tr>
        <th>
          <Filter text="Название меню" onFilterChange={(value) => onFilterChange(value, 'Название меню')} />
        </th>
        <th>
          <Filter text="Филиал" onFilterChange={(value) => onFilterChange(value, 'Филиал')} />
        </th>
        <th>
          <Filter text="Торговая точка" onFilterChange={(value) => onFilterChange(value, 'Торговая точка')} />
        </th>
        <th>
          <select className="branch__select" onChange={(e) => onStatusChange(e.target.value)}>
            <option value="">Все</option>
            <option value="active">Активно</option>
            <option value="inactive">Неактивно</option>
          </select>
        </th>
        <th>Экспорт</th>
        <th>Функции</th>
      </tr>
    </thead>
  );
}

export default MenuFilter;
