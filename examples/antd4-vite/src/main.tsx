import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "antd/dist/antd.less";
import "antd4-theme-vars/themes/custom.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider>
      default:
      <App />
    </ConfigProvider>
    <ConfigProvider prefixCls="custom">
      custom:
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
