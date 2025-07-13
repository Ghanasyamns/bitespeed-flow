import { Handle, Position } from "@xyflow/react";
import Message from "./icons/message";
import { EdgeEndpoint } from "../types/node-types";

type Props = {
  id: string;
  data: Record<string, string | EdgeEndpoint[]>;
  type: string;
};
function TextNode({ data }: Props) {
  const { message, handleTypes } = data;
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden w-40">
      <div className="bg-teal-100 px-4 py-1 flex items-center gap-2">
        <Message />
        <span className="font-semibold text-sm text-teal-800">
          Send Message
        </span>
      </div>
      <div className="px-4 py-1 text-sm">{message}</div>
      {handleTypes && handleTypes?.includes(EdgeEndpoint.Source) && (
        <Handle type="source" position={Position.Right} className="w-2 h-2" />
      )}
      {handleTypes && handleTypes?.includes(EdgeEndpoint.Target) && (
        <Handle type="target" position={Position.Left} className="w-2 h-2" />
      )}
    </div>
  );
}

export default TextNode;
