import React from 'react'
import accountingSVG from '../icons/accounting.svg';

function Company() {
  return (
    <div className="aside--company">

      <div className="company--block">
        <span className="company--i">ф</span>
        <div>
          <h2 className="company--h2">Название фирмы</h2>
          <p className="company--name">Лоскутникова В.П.</p>
        </div>
      </div>

      <span className="company--line"></span>

      <div className="company--block">
      <img src={accountingSVG} alt="Accounting" width="42" height="42" />
        <h2 className="company--h2">Складской учет</h2>
      </div>

    </div>
  );
}

export default Company;