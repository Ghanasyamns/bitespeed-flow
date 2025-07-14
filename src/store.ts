import { create } from "zustand";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  MarkerType,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";
import { EdgeEndpoint } from "./types/node-types";

const initialNodes = [
  {
    id: uuidv4(),
    type: "text",
    position: { x: 0, y: 0 },
    data: {
      message: "test message 1",
      handleTypes: [EdgeEndpoint.Source],
    },
  },
  {
    id: uuidv4(),
    type: "text",
    position: { x: 300, y: -100 },
    data: {
      message: "test message 2",
      handleTypes: [EdgeEndpoint.Source, EdgeEndpoint.Target],
    },
  },
];
const initialEdges = [
  {
    id: uuidv4(),
    source: initialNodes[0].id,
    target: initialNodes[1].id,
    markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
  },
];
export type FlowStore = {
  nodes: Node[];
  edges: Edge[];
  nodeIDs: Record<string, number>;
  removeSelectedNode: (node: Node) => void;
  getNodeID: (type: string) => string;
  addNode: (node: Node) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNodeField: (
    nodeId: string,
    fieldName: string,
    fieldValue: string
  ) => void;
  saveFlow: () => void;
};

export const useStore = create<FlowStore>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  nodeIDs: {},
  isNodeSelected: true,
  removeSelectedNode: (node?: Node) => {
    if (node === undefined) return;
    const changes = [
      {
        id: node.id,
        type: "select" as const,
        selected: false,
      },
    ];
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    const newNode = { ...node, data: { ...node.data } };
    // add default handle types for new nodes
    newNode.data.handleTypes = [EdgeEndpoint.Source, EdgeEndpoint.Target];
    set({
      nodes: [...get().nodes, newNode],
    });
  },
  onNodesChange: (changes) => {
    const nodes = applyNodeChanges(changes, get().nodes);
    set({
      nodes,
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
        },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, [fieldName]: fieldValue },
          };
        }
        return node;
      }),
    });
  },
  saveFlow: () => {
    const { nodes, edges } = get();
    console.log("Saved Flow:", { nodes, edges });
  },
}));
