import upArrow from "../../assets/image/up.png";
import downArrow from "../../assets/image/down.png";
import type { Investor } from "../../api/campaign";
const Contributors = ({ investors }) => {
  function formatNum(n) {
    let parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return (
      numberPart.replace(thousands, "") + (decimalPart ? "." + decimalPart : "")
    );
  }
  const data: Array<Investor> = investors;
  console.log(investors);
  return (
    <div className="campaign-section">
      <h2>Nos co-investisseurs</h2>
      <table className="camp-investors">
        <tbody>
          <tr>
            <th>
              <span>
                Rang
                <img src={downArrow} />
              </span>
            </th>
            <th>
              <span className="long">
                Contributeur
                <img src={downArrow} />
              </span>
            </th>
            <th className="right">
              <span>
                Parts
                <img src={downArrow} />
              </span>
            </th>
            <th className="right">
              <span>
                Pourcentage
                <img src={downArrow} />
              </span>
            </th>
            <th className="right">
              <span>
                Contribution
                <img src={downArrow} />
              </span>
            </th>
          </tr>
          {data.map((d, index) => (
            <tr key={`c_${index}`}>
              <td>{d.rank}</td>
              <td className={d.is_anonymous ? "anon" : ""}>
                {d.is_anonymous
                  ? "Contribution discrète"
                  : `${d.first_name} ${d.last_name}`}
              </td>
              <td className="right">{d.shares}</td>
              <td className="right">{d.percent.toFixed(3)}%</td>
              <td className="right">{formatNum(d.amount)}$</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paging">
        &lt;&nbsp;
        <a href="" className="current">
          1
        </a>
        &nbsp;<a href="">2</a>&nbsp;
        <a href="">3</a>&nbsp;&gt;
      </div>
    </div>
  );
};
export default Contributors;
