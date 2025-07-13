import "./App.css";
import "@xyflow/react/dist/style.css";
import PipelineUI from "./components/pipeline-ui";
import SettingsPanel from "./components/settings-panel";

function App() {
  return (
    <div className="">
      <div className="h-[10vh] flex justify-end pr-20 items-center">
        <button className=" h-[40px] border rounded-md px-3  border-blue-400 text-blue-600 font-medium">
          Save changes
        </button>
      </div>
      <div className="flex bg-gray-100 h-screen">
        <PipelineUI />
        <SettingsPanel />
      </div>
    </div>
  );
}

export default App;
