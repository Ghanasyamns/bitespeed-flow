import {
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
  type ReactFlowInstance,
  type XYPosition,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useShallow } from "zustand/shallow";
import { useStore, type RFState } from "../store";
import Sidebar from "./sidebar";
import TextNode from "./text-node";
import {
  useCallback,
  useRef,
  useState,
  type DragEvent,
  type DragEventHandler,
} from "react";
import { v4 as uuidv4 } from "uuid";
const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});
export default function PipelineUI() {
  const shallow = useShallow(selector);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
    Node,
    Edge
  > | null>(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(shallow);

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (reactFlowWrapper.current === null) return;
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance?.flowToScreenPosition({
          x: event.clientX - (reactFlowBounds?.left || 0),
          y: event.clientY - (reactFlowBounds?.top || 0),
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: uuidv4(),
          type,
          position,
          data: { id: nodeID, nodeType: `${type}` },
        };

        addNode(newNode);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="h-[10vh] flex justify-end pr-20 items-center">
        <button className=" h-[40px] border rounded-md px-3  border-blue-400 text-blue-600 font-medium">
          Save changes
        </button>
      </div>
      <div
        ref={reactFlowWrapper}
        style={{ width: "80vw", height: "90vh" }}
        className="flex"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{ text: TextNode }}
          onInit={setReactFlowInstance}
          fitView
        >
          <Controls />
          <MiniMap />
          {/* <Background variant={BackgroundVariant.Lines} gap={12} size={1} /> */}
        </ReactFlow>
        <Sidebar />
      </div>
    </div>
  );
}
