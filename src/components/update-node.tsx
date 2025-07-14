import { useShallow } from "zustand/shallow";
import { useStore, type FlowStore } from "../store";
import BackButton from "./icons/back-button";
const selector = (state: FlowStore) => ({
  selectedNode: state.nodes.find((node) => node.selected),
  updateNodeField: state.updateNodeField,
  removeSelectedNode: state.removeSelectedNode,
});
function UpdateNode() {
  const { selectedNode, removeSelectedNode, updateNodeField } = useStore(
    useShallow(selector)
  );

  return (
    <div className="w-full">
      <div className="flex items-center mb-4">
        <button
          className="mr-2"
          onClick={() => selectedNode && removeSelectedNode(selectedNode)}
        >
          <BackButton />
        </button>
        <h3 className="text-lg font-semibold">Message</h3>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text
        </label>
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded-md"
          value={selectedNode?.data.message as string}
          onChange={(e) =>
            updateNodeField(selectedNode!.id, "message", e.target.value)
          }
        />
      </div>
    </div>
  );
}

export default UpdateNode;
