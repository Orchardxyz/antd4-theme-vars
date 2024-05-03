import AntdCompGroup from "./AntdCompGroup";
import { Collapse, ConfigProvider } from "antd";
import "antd/dist/antd.css";
import "antd4-theme-vars/themes/custom.css";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Collapse style={{ width: 800 }}>
        <Collapse.Panel key="default" header="default">
          <AntdCompGroup />
        </Collapse.Panel>
        <Collapse.Panel key="custom" header="custom">
          <ConfigProvider prefixCls="custom">
            <AntdCompGroup />
          </ConfigProvider>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default App;
