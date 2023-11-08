import accountingSVG from '../icons/accounting.svg';

function Company() {
  return (
    <div className="aside__company">

      <div className="company__block">
        <span className="company__i">ф</span>
        <div>
          <h2 className="company__h2">Название фирмы</h2>
          <p className="company__name">Лоскутникова В.П.</p>
        </div>
      </div>

      <span className="company__line"></span>

      <div className="company__block">
      <img src={accountingSVG} alt="Accounting" width="42" height="42" />
        <h2 className="company__h2">Складской учет</h2>
      </div>

    </div>
  );
}

export default Company;