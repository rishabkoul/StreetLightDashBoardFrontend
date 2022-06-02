import "./App.scss";
import MapComponent from "./components/MapComponent/MapComponent";
import PieChartComponent from "./components/PieChartComponent/PieChartComponent";
import StreetLightTable from "./components/StreetLightTable/StreetLightTable";
import Card from "./components/ui/Card/Card";

function App() {
  return (
    <div className="dashboard">
      <Card center_text="true">
        <h1>Street Light Dashboard</h1>
      </Card>

      <Card>
        <StreetLightTable />
      </Card>
      <div className="flex-container">
        <Card>
          <PieChartComponent
            heading="No of Devices with Battery Status Ok vs Not Ok"
            url="https://streetlightdashboardbackend.herokuapp.com/api/get_all_states"
            collection="states"
          />
          <div className="states_legend">
            <div>
              <div className="states_legend_green"></div>
              <span>Ok</span>
            </div>
            <div>
              <div className="states_legend_red"></div>
              <span>Not Ok</span>
            </div>
          </div>
        </Card>

        <Card>
          <MapComponent
            heading="Devices with Battery Status Ok vs Not Ok (Red - Not Ok , Green - Ok)"
            url="https://streetlightdashboardbackend.herokuapp.com/api/get_all_states_with_lon_lat"
            collection="states_with_lon_lat"
          />
        </Card>
      </div>
    </div>
  );
}

export default App;
