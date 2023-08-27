import { FC, useEffect } from "react";
import { useToastStore } from "../../store/toast.store";
import { useThemeStore } from "../../store/theme.store";

const Toast: FC = () => {
  const toastContent = useToastStore((state) => state.toastContent);
  const toastState = useToastStore((state) => state.toastState);
  const toastType = useToastStore((state) => state.toastType);
  const setToastState = useToastStore((state) => state.setToastState);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    setTimeout(() => {
      setToastState(false, "", "");
    }, 5000);
  }, [toastState]);

  if (!toastState) return null;

  return (
    <>
      <div className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow fixed bottom-0 left-5 dark:bg-neutral-800">
        <div
          className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${
            toastType === "success"
              ? "green"
              : toastType === "warning"
              ? "orange"
              : "red"
          }-500 bg-${
            toastType === "success"
              ? "green"
              : toastType === "warning"
              ? "orange"
              : "red"
          }-100 rounded-lg`}
        >
          {toastType === "success" ? (
            <Success />
          ) : toastType === "warning" ? (
            <Warning />
          ) : (
            <Danger />
          )}
        </div>
        <div className="ml-3 text-sm font-normal dark:text-neutral-200">
          {toastContent}
        </div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:bg-neutral-800"
          onClick={() => setToastState(false, "", "")}
        >
          <svg
            className="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke={`${theme === "light" ? "currentColor" : "lightgray"}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

const Success = () => {
  return (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="green"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
  );
};

const Warning = () => {
  return (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="orange"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
    </svg>
  );
};

const Danger = () => {
  return (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="red"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
    </svg>
  );
};

export default Toast;
