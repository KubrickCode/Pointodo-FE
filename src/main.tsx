import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactQueryProvider from "./provider/ReactQueryProvider";
import RouterProvider from "./provider/RouterProvider.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RouterProvider>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </RouterProvider>
);
