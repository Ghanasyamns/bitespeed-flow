import { useStore, type FlowStore } from "../store";
import { useShallow } from "zustand/shallow";
import Sidebar from "./custom-nodes";

const selector = (state: FlowStore) => ({
  selectedNode: state.nodes.find((node) => node.selected),
  updateNodeField: state.updateNodeField,
  isSidebarVisible: state.isSidebarVisible,
});

function SettingsPanel() {
  const { selectedNode, updateNodeField, isSidebarVisible } = useStore(
    useShallow(selector)
  );

  return (
    <div className="border-l border-gray-300 w-full">
      <div className="mt-4 px-3 flex flex-wrap gap-2">
        {isSidebarVisible && !selectedNode ? (
          <Sidebar />
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
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
          </>
        )}
      </div>
    </div>
  );
}

export default SettingsPanel;
