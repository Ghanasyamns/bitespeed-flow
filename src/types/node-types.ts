import type {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "@xyflow/react";
import type { ToastType } from "./toast-types";

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
  toast: ToastType;
  showToast: (message: string, type: "success" | "error") => void;
  hideToast: () => void;
};

export enum EdgeEndpoint {
  Source = "source",
  Target = "target",
}
