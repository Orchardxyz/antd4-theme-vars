import {
  DownOutlined,
  FrownFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  PageHeader,
  Pagination,
  Popover,
  Radio,
  Slider,
  Space,
  Steps,
  Switch,
  Timeline,
  Tree,
} from "antd";

const description = "This is a description.";

function AntdCompGroup() {
  return (
    <Space wrap>
      <Button>Default Button</Button>
      <Button type="primary">Primary Button</Button>
      <Steps
        current={1}
        items={[
          {
            title: "Finished",
            description,
          },
          {
            title: "In Progress",
            description,
            subTitle: "Left 00:00:08",
          },
          {
            title: "Waiting",
            description,
          },
        ]}
      />
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Title"
        subTitle="This is a subtitle"
      />
      <Pagination defaultCurrent={1} total={50} />
      <Cascader
        options={[
          {
            value: "zhejiang",
            label: "Zhejiang",
            children: [
              {
                value: "hangzhou",
                label: "Hangzhou",
                children: [
                  {
                    value: "xihu",
                    label: "West Lake",
                  },
                ],
              },
            ],
          },
          {
            value: "jiangsu",
            label: "Jiangsu",
            children: [
              {
                value: "nanjing",
                label: "Nanjing",
                children: [
                  {
                    value: "zhonghuamen",
                    label: "Zhong Hua Men",
                  },
                ],
              },
            ],
          },
        ]}
        placeholder="Please select"
      />

      <Checkbox checked>Checkbox</Checkbox>
      <Checkbox checked disabled>
        Checkbox Disabled
      </Checkbox>
      <Radio value={0}>Radio</Radio>
      <Radio value={1} disabled>
        Radio Disabled
      </Radio>
      <DatePicker.RangePicker showTime />
      <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
      <Slider style={{ width: 300 }} range defaultValue={[20, 50]} />
      <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
      <Popover
        content={
          <div>
            <p>Content</p>
            <p>Content</p>
          </div>
        }
        title="Title"
      >
        <Button type="primary">Hover me</Button>
      </Popover>
      <Timeline>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
      </Timeline>
      <Tree
        showIcon
        defaultExpandAll
        defaultSelectedKeys={["0-0-0"]}
        switcherIcon={<DownOutlined />}
        treeData={[
          {
            title: "parent 1",
            key: "0-0",
            icon: <SmileOutlined />,
            children: [
              {
                title: "leaf",
                key: "0-0-0",
                icon: <MehOutlined />,
              },
              {
                title: "leaf",
                key: "0-0-1",
                icon: ({ selected }) =>
                  selected ? <FrownFilled /> : <FrownOutlined />,
              },
            ],
          },
        ]}
      />
    </Space>
  );
}

export default AntdCompGroup;
