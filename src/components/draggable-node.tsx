import type { DragEvent } from "react";

type Props = {
  type: string;
  label: string;
};
export const DraggableNode = ({ type, label }: Props) => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    const appData = { nodeType };
    (event.target as HTMLElement).style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-w-[80px] h-[60px] p-[5px] border border-blue-500 rounded-lg bg-white text-blue-500 cursor-grab active:cursor-grabbing"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) =>
        ((event.target as HTMLElement).style.cursor = "grab")
      }
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
