// import styles from './PieChartComponent.module.css'
import { PieChart } from "react-minimal-pie-chart";

import { useEffect, useState, useCallback } from "react";

const PieChartComponent = ({ heading, url, collection }) => {
  const [data, setData] = useState();

  const getData = useCallback(async () => {
    const response = await fetch(url);
    setData(await response.json());
  }, [url]);

  useEffect(() => {
    // Update the document title using the browser API
    getData();
  }, [url, getData]);

  return (
    <div>
      <h3>{heading}</h3>
      {/* {data[0][collection].map((ele) => {
        return <li>{ele}</li>;
      })} */}
      {data ? (
        <PieChart
          data={[
            {
              title: "OK",
              value: data[0][collection].filter((x) => x === "'OK'").length,
              color: "green",
            },
            {
              title: "NOT_OK",
              value:
                data[0][collection].length -
                data[0][collection].filter((x) => x === "'OK'").length,
              color: "red",
            },
          ]}
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={{ fontSize: "10px", fill: "white" }}
        />
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default PieChartComponent;
