import React, { useState, useEffect } from 'react';

type Branch = {
  id: number;
  name: string;
};

function BranchDD() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>(''); // Specify the type for selectedBranch

  useEffect(() => {
    
    const apiData: Branch[] = [
      {
        id: 0,
        name: "Иркутск"
      },
      {
        id: 1,
        name: "Шелехов"
      },
      {
        id: 2,
        name: "Ангарск"
      }
    ];

    setBranches(apiData);
  }, []);

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
