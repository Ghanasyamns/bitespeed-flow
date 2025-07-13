import "./App.css";
import "@xyflow/react/dist/style.css";
import PipelineUI from "./components/pipeline-ui";

function App() {
  return (
    <div className="">
      <div className="h-[10vh] flex justify-end pr-20 items-center">
        <button className=" h-[40px] border rounded-md px-3  border-blue-400 text-blue-600 font-medium">
          Save changes
        </button>
      </div>
      <div className="flex-grow bg-gray-100">
        <PipelineUI />
      </div>
      {/* <div className="w-1/4 border-l border-gray-300 bg-white">
        <PipelineToolbar />
      </div> */}
    </div>
  );
}

export default App;
