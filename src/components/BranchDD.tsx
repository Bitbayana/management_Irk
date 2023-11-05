import React, { useState, useEffect } from 'react';
import { IFilial } from '../types/types';
import axios from 'axios';

interface BranchDDProps {
  onFilialSelect: (filialId: string) => void; // Keep the type as string
}

function BranchDD({ onFilialSelect }: BranchDDProps) {
  const [branches, setBranches] = useState<IFilial[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>(''); // Initialize with a string

  useEffect(() => {
    fetchFilial()
  }, []);

  async function fetchFilial() {
    try {
      const response = await axios.get<IFilial[]>('https://testjob.checkport.ru/filial/')
      setBranches(response.data)
    } catch (e) {
      alert(e)
    }
  }

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBranchId = event.target.value; // Use the selected value as is (a string)
    setSelectedBranch(selectedBranchId);
    onFilialSelect(selectedBranchId); // Pass the selected Filial ID to the parent component
  };

  return (
    <div className="aside--branch">
      <label className="branch--label" htmlFor="branch">Филиалы</label>
      <select className="branch--select" name="branch" id="branch" value={selectedBranch} onChange={handleBranchChange}>
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>
      <span className="company--line"></span>
    </div>
  );
}

export default BranchDD;
