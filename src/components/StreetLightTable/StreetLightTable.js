import { useState, useEffect, useCallback } from "react";
import styles from "./StreetLightTable.module.css";
import { CSVLink } from "react-csv";

const StreetLightTable = () => {
  const [data, setData] = useState();
  const [pageno, setPageNo] = useState(1);
  const [gotopage, setGoToPage] = useState();
  const [query, setQuery] = useState("");

  const getData = useCallback(async () => {
    const response = await fetch(
      `https://streetlightdashboardbackend.herokuapp.com/api/get_all?no_of_results_per_page=10&page_no=${pageno}&query=${query}`
    );
    setData(await response.json());
  }, [pageno, query]);

  const goToPage = (e) => {
    e.preventDefault();
    if (!gotopage) {
      return alert("Enter a Page to Visit");
    }
    if (gotopage < 1) {
      return alert("Page cannot be less then One");
    }
    if (gotopage > parseInt(data[0]["no_of_pages"])) {
      return alert("Page cannot be greater than the Last Page");
    }
    if (pageno !== gotopage) {
      setData(null);
      setPageNo(gotopage);
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    getData();
  }, [pageno, query, getData]);

  return (
    <div>
      <h3>Street Light Table</h3>
      <input
        className={styles.searchInput}
        placeholder="Search on Textual Data"
        type="text"
        onChange={(e) => {
          setData(null);
          setPageNo(1);
          setQuery(e.target.value);
        }}
      />
      {data ? (
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>BV</th>
                <th>BI</th>
                <th>SV</th>
                <th>SI</th>
                <th>LV</th>
                <th>LI</th>
                <th>BA</th>
                <th>STATE</th>
                <th>LAT</th>
                <th>LON</th>
                <th>DRY_BIN</th>
                <th>WET_BIN</th>
                <th>TIME_STAMP</th>
              </tr>
            </thead>
            <tbody>
              {data[0]["Streetlights"].map((streetlight) => {
                return (
                  <tr key={streetlight.ID}>
                    <td>{streetlight.ID}</td>
                    <td>{streetlight.BV}</td>
                    <td>{streetlight.BI}</td>
                    <td>{streetlight.SV}</td>
                    <td>{streetlight.SI}</td>
                    <td>{streetlight.LV}</td>
                    <td>{streetlight.LI}</td>
                    <td>{streetlight.BA}</td>
                    <td>{streetlight.STATE}</td>
                    <td>{streetlight.LAT}</td>
                    <td>{streetlight.LON}</td>
                    <td>{streetlight.DRY_BIN}</td>
                    <td>{streetlight.WET_BIN}</td>
                    <td>{streetlight.TIME_STAMP}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>
            Page No: {pageno} of {data[0]["no_of_pages"]}
          </p>
          <button
            onClick={() => {
              if (pageno !== 1) {
                setData(null);
                setPageNo((prev) => prev - 1);
              }
            }}
          >
            Previous Page
          </button>
          <button
            onClick={() => {
              const no_of_pages = parseInt(data[0]["no_of_pages"]);
              if (pageno !== no_of_pages) {
                setData(null);
                setPageNo((prev) => prev + 1);
              }
            }}
          >
            Next Page
          </button>
          <form onSubmit={goToPage}>
            <input
              onChange={(e) => setGoToPage(parseInt(e.target.value))}
              type="number"
              placeholder="Enter Page no to Visit"
            ></input>
            <button type="submit">Go</button>
            <CSVLink
              filename={"Streetlights.csv"}
              data={data[0]["Streetlights"]}
            >
              <button className={styles.downloadButton} type="button">
                Download Data
              </button>
            </CSVLink>
          </form>
        </div>
      ) : (
        <h3>Loading ...</h3>
      )}
    </div>
  );
};

export default StreetLightTable;
