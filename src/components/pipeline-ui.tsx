import {
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useShallow } from "zustand/shallow";
import { useStore, type FlowStore } from "../store";
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
const selector = (state: FlowStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});
const nodeTypes = { text: TextNode };
export default function PipelineUI() {
  const shallow = useShallow(selector);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
    Node,
    Edge
  > | null>(null);
  const { nodes, edges, addNode, onNodesChange, onEdgesChange, onConnect } =
    useStore(shallow);

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (reactFlowWrapper.current === null) return;
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (
        event?.dataTransfer?.getData("application/reactflow") &&
        reactFlowInstance
      ) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - (reactFlowBounds?.left || 0),
          y: event.clientY - (reactFlowBounds?.top || 0),
        });

        const id = uuidv4();
        const newNode = {
          id: id,
          type,
          position,
          data: {
            id: id,
            nodeType: type,
            message: `test message ${nodes.length + 1}`,
          },
        };

        addNode(newNode);
      }
    },
    [addNode, nodes, reactFlowInstance]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }, []);

  return (
    <div className="w-full h-screen">
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
          nodeTypes={nodeTypes}
          onInit={setReactFlowInstance}
          fitView
        >
          <Controls />
          <MiniMap />
        </ReactFlow>
        <Sidebar />
      </div>
    </div>
  );
}
