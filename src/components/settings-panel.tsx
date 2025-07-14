import { useShallow } from "zustand/shallow";
import { useStore, type FlowStore } from "../store";
import CustomNodes from "./custom-nodes";
import UpdateNode from "./update-node";

const selector = (state: FlowStore) => ({
  selectedNode: state.nodes.find((node) => node.selected),
});

function SettingsPanel() {
  const { selectedNode } = useStore(useShallow(selector));

  return (
    <div className="border-l border-gray-300 w-full">
      <div className="mt-4 px-3 flex flex-wrap gap-2">
        {!selectedNode ? <CustomNodes /> : <UpdateNode />}
      </div>
    </div>
  );
}

export default SettingsPanel;
