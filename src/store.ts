import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
  type Node,
} from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { EdgeEndpoint, type FlowStore } from "./types/node-types";

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

export const useStore = create<FlowStore>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  nodeIDs: {},
  isNodeSelected: true,
  toast: { message: "", type: "success", visible: false },
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
    const nodes = get().nodes;
    const index = nodes.findIndex((node) => node.id === nodeId);
    if (index === -1) return; // Node not found
    const newNodes = [...nodes];
    newNodes[index] = {
      ...newNodes[index],
      data: { ...newNodes[index].data, [fieldName]: fieldValue },
    };

    set({ nodes: newNodes });
  },
  saveFlow: () => {
    const { nodes, edges, showToast } = get();
    const nodesWithNoOutgoingEdges = nodes.filter(
      (node) => !edges.some((edge) => edge.source === node.id)
    );

    if (nodes.length > 1 && nodesWithNoOutgoingEdges.length > 1) {
      showToast(
        "Error: Cannot save flow. More than one node has empty target handles.",
        "error"
      );
      return;
    }

    // Validate source handles: A source handle can only have one edge originating from it.
    for (const node of nodes) {
      const outgoingEdges = edges.filter((edge) => edge.source === node.id);
      if (outgoingEdges.length > 1) {
        showToast(
          `Error: Node "${node.id}" has more than one outgoing edge from its source handle.`,
          "error"
        );
        return;
      }
    }

    console.log("Saved Flow:", { nodes, edges });
    showToast("Flow saved successfully!", "success");
  },
  showToast: (message, type) => {
    set({ toast: { message, type, visible: true } });
  },
  hideToast: () =>
    set((state) => ({ toast: { ...state.toast, visible: false } })),
}));
