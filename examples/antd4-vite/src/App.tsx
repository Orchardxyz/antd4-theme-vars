import { version, Space, DatePicker, Button, Progress } from "antd";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>antd version: {version}</h1>
        <Space>
          <DatePicker />
          <Button type="primary">Primary Button</Button>
          <Progress type="line" percent={50} style={{ width: "200px" }} />
        </Space>
      </div>
    </>
  );
}

export default App;
