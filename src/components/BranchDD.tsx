import React, { useState, useEffect } from 'react';
import { IFilial } from '../types/types';
import axios from 'axios';

interface BranchDDProps {
    onFilialSelect: (filialId: number) => void;
  }

function BranchDD({ onFilialSelect }: BranchDDProps) {
  const [branches, setBranches] = useState<IFilial[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<number>(); 

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
    const selectedBranchId = parseInt(event.target.value, 10);
  
    
    console.log("ТЕКСТ В BRANCH",selectedBranchId);
  
    
    setSelectedBranch(selectedBranchId);
  
   
    onFilialSelect(selectedBranchId);
  }
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