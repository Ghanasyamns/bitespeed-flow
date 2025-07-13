import "./App.css";
import "@xyflow/react/dist/style.css";
import PipelineUI from "./components/pipeline-ui";

function App() {
  return (
    <div className="flex flex-row h-screen bg-gray-100">
      <div className="flex-grow">
        <PipelineUI />
      </div>
      {/* <div className="w-1/4 border-l border-gray-300 bg-white">
        <PipelineToolbar />
      </div> */}
    </div>
  );
}

export default App;
