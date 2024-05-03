import AntdCompGroup from "./AntdCompGroup";
import { Collapse, ConfigProvider } from "antd";
import "antd/dist/antd.css";
import "antd4-theme-vars/themes/green.css";
import "antd4-theme-vars/themes/orange.css";
import "antd4-theme-vars/themes/yellow.css";
import "antd4-theme-vars/themes/purple.css";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        padding: "24px 0",
      }}
    >
      <Collapse style={{ width: "72%" }}>
        <Collapse.Panel key="default" header="default">
          <AntdCompGroup />
        </Collapse.Panel>
        <Collapse.Panel key="green" header="green">
          <ConfigProvider prefixCls="green">
            <AntdCompGroup />
          </ConfigProvider>
        </Collapse.Panel>
        <Collapse.Panel key="orange" header="orange">
          <ConfigProvider prefixCls="orange">
            <AntdCompGroup />
          </ConfigProvider>
        </Collapse.Panel>
        <Collapse.Panel key="yellow" header="yellow">
          <ConfigProvider prefixCls="yellow">
            <AntdCompGroup />
          </ConfigProvider>
        </Collapse.Panel>
        <Collapse.Panel key="purple" header="purple">
          <ConfigProvider prefixCls="purple">
            <AntdCompGroup />
          </ConfigProvider>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default App;
