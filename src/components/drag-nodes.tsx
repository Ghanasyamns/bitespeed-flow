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
      className="flex flex-col items-center justify-center min-w-[80px] h-[60px] p-[5px] border border-[#1C2536] rounded-lg bg-[#1C2536] text-white cursor-grab active:cursor-grabbing"
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
