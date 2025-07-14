import { useEffect } from "react";
import { useStore } from "../store";
import type { ToastType } from "../types/toast-types";

type Props = {
  toast: ToastType;
};
const Toast = ({ toast }: Props) => {
  const hideToast = useStore((state) => state.hideToast);

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [toast.visible, hideToast]);

  if (!toast.visible) return null;

  const bgColor = toast.type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 p-4 rounded-md text-white shadow-lg z-50 ${bgColor}`}
    >
      {toast.message}
    </div>
  );
};

export default Toast;
