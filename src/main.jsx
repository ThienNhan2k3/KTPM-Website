import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { cn } from "./lib/utils.js";

console.log(cn(
  "tw-z-50 tw-w-72 tw-rounded-md tw-border tw-border-slate-200 tw-bg-white tw-p-4 tw-text-slate-950 tw-shadow-md tw-outline-none tw-data-[state=open]:animate-in tw-data-[state=closed]:animate-out tw-data-[state=closed]:fade-out-0 tw-data-[state=open]:fade-in-0 tw-data-[state=closed]:zoom-out-95 tw-data-[state=open]:zoom-in-95 tw-data-[side=bottom]:slide-in-from-top-2 tw-data-[side=left]:slide-in-from-right-2 tw-data-[side=right]:slide-in-from-left-2 tw-data-[side=top]:slide-in-from-bottom-2 tw-dark:border-slate-800 tw-dark:bg-slate-950 tw-dark:text-slate-50",
));


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
