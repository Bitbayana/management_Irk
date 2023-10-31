import React, { useState, useEffect } from 'react';
import { IFilial } from '../types/types';
import axios from 'axios';

function BranchDD() {
  const [branches, setBranches] = useState<IFilial[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>('');

  useEffect(() => {
    fetchFilial()
  }, []);

  async function fetchFilial() {
    try{
      const response = await axios.get<IFilial[]>('https://testjob.checkport.ru/filial/')
      setBranches(response.data)
    } catch (e) {
      alert(e)
    }
  }

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    setSelectedBranch(event.target.value);
  };

  return (
    <div className="aside--branch">
      <label className="branch--label" htmlFor="branch">Филиалы</label>
      <select className="branch--select" name="branch" id="branch" value={selectedBranch} onChange={handleBranchChange}>
        {branches.map((branch) => (
          <option key={branch.id} value={branch.name}>
            {branch.name}
          </option>
        ))}
      </select>
      <span className="company--line"></span>
    </div>
  );
}

export default BranchDD;
