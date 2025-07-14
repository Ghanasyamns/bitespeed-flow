import { useStore } from "../store";

export const ChatFlowToolbar = () => {
  const saveFlow = useStore((state) => state.saveFlow);

  return (
    <div className="h-[10vh] flex justify-end pr-20 items-center">
      <button
        onClick={saveFlow}
        className=" h-[40px] border rounded-md px-3  border-blue-400 text-blue-600 font-medium"
      >
        Save changes
      </button>
    </div>
  );
};
