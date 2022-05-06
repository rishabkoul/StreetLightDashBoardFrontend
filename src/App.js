import "./App.css";
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
      <div className="flex-container">
        <Card>
          <StreetLightTable />
        </Card>
        <Card>
          <PieChartComponent
            heading="No of Devices with States Ok vs Not Ok"
            url="https://streetlightdashboardbackend.herokuapp.com/api/get_all_states"
            collection="states"
          />
        </Card>
      </div>
      <Card>
        <MapComponent />
      </Card>
    </div>
  );
}

export default App;
