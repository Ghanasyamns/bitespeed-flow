import { DraggableNode } from "./drag-nodes";
import { useStore } from "../store";

export const PipelineToolbar = () => {
  const saveFlow = useStore((state) => state.saveFlow);

  return (
    <div className="p-4 border-b border-gray-300 bg-white">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={saveFlow}
        >
          Save Changes
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <DraggableNode type="text" label="Message" />
      </div>
    </div>
  );
};
