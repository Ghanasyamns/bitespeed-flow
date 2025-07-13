import { DraggableNode } from "./drag-nodes";

function Sidebar() {
  return (
    <div className="border-l border-gray-300">
      <div className="mt-4 flex flex-wrap gap-2">
        <DraggableNode type="text" label="Message" />
      </div>
    </div>
  );
}

export default Sidebar;
