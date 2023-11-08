import React, { useState, useEffect } from 'react';
import { IFilial } from '../types/types';
import axios from 'axios';
import { useFilialContext } from './FilialContext';
import config from '../config/config';

interface BranchDDProps {
  onFilialSelect: (filialId: number) => void;
}

function BranchDD({ onFilialSelect }: BranchDDProps) {
  const { setFilial } = useFilialContext();
  const [branches, setBranches] = useState<IFilial[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<number | undefined>();

  useEffect(() => {
    fetchFilial();
  }, []);

  async function fetchFilial() {
    try {
      const response = await axios.get<IFilial[]>(`${config.API_BASE_URL}/filial/`);
      setBranches(response.data);
    } catch (error) {
      alert(error);
    }
  }

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selectedBranchId = parseInt(value, 10);
    setSelectedBranch(selectedBranchId);
    setFilial(selectedBranchId);
  };

  return (
    <div className="aside__branch">
      <label className="branch__label" htmlFor="branch">
        Филиалы
      </label>
      <select
        className="branch__select"
        name="branch"
        id="branch"
        value={selectedBranch || ''}
        onChange={handleBranchChange}
      >
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>
      <span className="company__line"></span>
    </div>
  );
}

export default BranchDD;
