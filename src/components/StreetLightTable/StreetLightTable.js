import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./StreetLightTable.module.css";
import { CSVLink } from "react-csv";

const csvheaders = [
  { label: "ID", key: "ID" },
  { label: "Battery Voltage", key: "BV" },
  { label: "Battery Current", key: "BI" },
  { label: "Solar Voltage", key: "SV" },
  { label: "Solar Current", key: "SI" },
  { label: "Load Voltage", key: "LV" },
  { label: "Load Current", key: "LI" },
  // { label: 'Battery Current', key: 'BI' },
  { label: "Battery Status", key: "STATE" },
  { label: "Latitude", key: "LAT" },
  { label: "Longitude", key: "LON" },
  { label: "Charging Status", key: "CHARGING_STATUS" },
  { label: "Day/Night", key: "DAY_NIGHT" },
  { label: "Battery Wattage", key: "BW" },
  { label: "Solar Wattage", key: "SW" },
  { label: "Load Wattage", key: "LW" },
  { label: "Date", key: "DATE" },
  { label: "Time Stamp", key: "TIME_STAMP" },
];

const StreetLightTable = () => {
  const [data, setData] = useState();
  const [pageno, setPageNo] = useState(1);
  const [gotopage, setGoToPage] = useState();
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    "https://streetlightdashboardbackend.herokuapp.com/api/get_all?no_of_results_per_page=10"
  );
  const [lightId, setLightId] = useState("");
  const [wholeData, setWholeData] = useState();
  const searchRef = useRef();

  const getData = useCallback(async () => {
    const response = await fetch(`${url}&page_no=${pageno}&query=${query}`);
    setData(await response.json());
  }, [pageno, query, url]);

  const getWholeData = useCallback(async () => {
    let urlToFetch;
    if (lightId === "") {
      urlToFetch = `https://streetlightdashboardbackend.herokuapp.com/api/get_all_data_without_pagination?query=${query}`;
    } else {
      urlToFetch = `https://streetlightdashboardbackend.herokuapp.com/api/get_all_historical_data_without_pagination?query=${query}&light_id=${lightId}`;
    }
    const response = await fetch(`${urlToFetch}`);
    setWholeData(await response.json());
  }, [query, lightId]);

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
  }, [pageno, query, url, getData]);

  useEffect(() => {
    getWholeData();
  }, [getWholeData, query, lightId]);

  return (
    <div>
      <h3>Street Light Table</h3>
      {url !==
      "https://streetlightdashboardbackend.herokuapp.com/api/get_all?no_of_results_per_page=10" ? (
        <div>
          <button
            type="button"
            onClick={(e) => {
              setData(null);
              setPageNo(1);
              setUrl(
                "https://streetlightdashboardbackend.herokuapp.com/api/get_all?no_of_results_per_page=10"
              );
              setLightId("");
            }}
          >
            Back
          </button>
          <h4>Light Id: {lightId}</h4>
          <h4>Latest Data:</h4>
          {data ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Battery Voltage</th>
                  <th>Battery Current</th>
                  <th>Battery Wattage</th>
                  <th>Solar Voltage</th>
                  <th>Solar Current</th>
                  <th>Solar Wattage</th>
                  <th>Load Voltage</th>
                  <th>Load Current</th>
                  <th>Load Wattage</th>

                  <th>Battery Status</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Charging Status</th>
                  <th>Day/Night</th>

                  <th>DATE</th>
                  <th>TIME_STAMP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data[0]["latest_data"].ID}</td>
                  <td>{data[0]["latest_data"].BV}</td>
                  <td>{data[0]["latest_data"].BI}</td>
                  <td>{data[0]["latest_data"].BW}</td>
                  <td>{data[0]["latest_data"].SV}</td>
                  <td>{data[0]["latest_data"].SI}</td>
                  <td>{data[0]["latest_data"].SW}</td>
                  <td>{data[0]["latest_data"].LV}</td>
                  <td>{data[0]["latest_data"].LI}</td>
                  <td>{data[0]["latest_data"].LW}</td>

                  <td>{data[0]["latest_data"].STATE}</td>
                  <td>{data[0]["latest_data"].LAT}</td>
                  <td>{data[0]["latest_data"].LON}</td>
                  <td>{data[0]["latest_data"].CHARGING_STATUS}</td>
                  <td>{data[0]["latest_data"].DAY_NIGHT}</td>

                  <td>{data[0]["latest_data"].DATE}</td>
                  <td>{data[0]["latest_data"].TIME_STAMP}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      ) : null}
      <input
        className={styles.searchInput}
        placeholder="Search on Textual Data"
        type="text"
        ref={searchRef}
      />
      <button
        type="button"
        onClick={(e) => {
          setData(null);
          setWholeData(null);
          setPageNo(1);
          setQuery(searchRef.current.value);
        }}
      >
        Search
      </button>
      {data ? (
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Battery Voltage</th>
                <th>Battery Current</th>
                <th>Battery Wattage</th>
                <th>Solar Voltage</th>
                <th>Solar Current</th>
                <th>Solar Wattage</th>
                <th>Load Voltage</th>
                <th>Load Current</th>
                <th>Load Wattage</th>

                <th>Battery Status</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Charging Status</th>

                <th>Day/Night</th>

                <th>DATE</th>
                <th>TIME_STAMP</th>
              </tr>
            </thead>
            <tbody>
              {data[0]["Streetlights"].map((streetlight) => {
                return (
                  <tr key={streetlight.DATE + streetlight.TIME_STAMP}>
                    {url !==
                    `https://streetlightdashboardbackend.herokuapp.com/api/get_all?no_of_results_per_page=10` ? (
                      <td>{streetlight.ID}</td>
                    ) : (
                      <td>
                        <button
                          className={styles.buttonToLink}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setData(null);
                            setPageNo(1);
                            setUrl(
                              `https://streetlightdashboardbackend.herokuapp.com/api/get_all_historical_data?no_of_results_per_page=10&light_id=${streetlight.ID}`
                            );
                            setLightId(`${streetlight.ID}`);
                          }}
                        >
                          {streetlight.ID}
                        </button>
                      </td>
                    )}

                    <td>{streetlight.BV}</td>
                    <td>{streetlight.BI}</td>
                    <td>{streetlight.BW}</td>
                    <td>{streetlight.SV}</td>
                    <td>{streetlight.SI}</td>
                    <td>{streetlight.SW}</td>
                    <td>{streetlight.LV}</td>
                    <td>{streetlight.LI}</td>
                    <td>{streetlight.LW}</td>

                    <td>{streetlight.STATE}</td>
                    <td>{streetlight.LAT}</td>
                    <td>{streetlight.LON}</td>
                    <td>{streetlight.CHARGING_STATUS}</td>
                    <td>{streetlight.DAY_NIGHT}</td>

                    <td>{streetlight.DATE}</td>
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
            {wholeData && (
              <CSVLink
                filename={`Streetlights_${lightId}_${new Date().getFullYear()}/${
                  new Date().getMonth() + 1
                }/${String(new Date().getDate()).padStart(
                  2,
                  "0"
                )},${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.csv`}
                data={wholeData[0]["Streetlights"]}
                headers={csvheaders}
              >
                <button className={styles.downloadButton} type="button">
                  Download Data
                </button>
              </CSVLink>
            )}
          </form>
        </div>
      ) : (
        <h3>Loading ...</h3>
      )}
    </div>
  );
};

export default StreetLightTable;
