import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import "./App.css";
import nodata from "./assets/nodata.svg";
import loadingImg from "./assets/loading.gif";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false",
    )
      .then((data) => data.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (event) => {
    const s = event.target.value;
    if (s.trim() == "") {
      setFilteredData(data);
      return;
    } else {
      const newArr = data.filter((d) =>
        d.name.trim().toLowerCase().includes(s.trim().toLowerCase()),
      );
      setFilteredData(newArr);
    }

    console.log(s);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <main className="ai-box">
        {loading ? (
          <div className="loading-div">
            <img src={loadingImg} alt="loading_img" />
            <h2>Loading...</h2>
          </div>
        ) : (
          <div className="app-container">
            <div className="title-div">
              <h2 className="heading">Crypto Market📈</h2>
              <div className="search-div">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input
                    type="text"
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search Bitcoin..."
                  />
                </form>
              </div>
            </div>

            <div className="table-container">
              {filteredData.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Coin</th>
                      <th>
                        Price Change/24<sup>th</sup>
                      </th>
                      <th>
                        low / high 24<sup>th</sup>
                      </th>
                      <th>Price (USD)</th>
                      <th>M.Cap</th>
                      <th>Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 &&
                      filteredData.map((data, index) => (
                        <TableRow key={index} data={data} />
                      ))}
                  </tbody>
                </table>
              ) : (
                <div className="nodata">
                  <img src={nodata} alt="no_data_found" />
                  <h1>No Data Found!</h1>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};
export default App;
