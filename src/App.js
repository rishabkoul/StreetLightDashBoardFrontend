import "./App.scss";
import MapComponent from "./components/MapComponent/MapComponent";
import PieChartComponent from "./components/PieChartComponent/PieChartComponent";
import StreetLightTable from "./components/StreetLightTable/StreetLightTable";
import Card from "./components/ui/Card/Card";
import HSL_LOGO from "./images/HSL LOGO.jpg";

function App() {
  return (
    <div className="dashboard">
      <Card center_text="true">
        <div className="flex-container-logo-heading">
          <img className="logo" src={HSL_LOGO} alt="HSL Logo" />
          <h1>Solar LED Street Light Dashboard</h1>
        </div>
      </Card>

      <Card>
        <StreetLightTable baseUrl="https://street-light-dash-board-backend.vercel.app" />
      </Card>
      <div className="flex-container">
        <Card>
          <PieChartComponent
            heading="No of Devices with Battery Status Ok vs Not Ok"
            url="https://street-light-dash-board-backend.vercel.app/api/get_all_states"
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
            url="https://street-light-dash-board-backend.vercel.app/api/get_all_states_with_lon_lat"
            collection="states_with_lon_lat"
          />
        </Card>
      </div>
    </div>
  );
}

export default App;
