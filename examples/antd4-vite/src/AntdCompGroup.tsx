import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  PageHeader,
  Pagination,
  Popover,
  Radio,
  Rate,
  Slider,
  Space,
  Steps,
  Switch,
  Timeline,
} from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

const description = "This is a description.";

function AntdCompGroup() {
  return (
    <Space wrap>
      <Button>Default Button</Button>
      <Button type="primary">Primary Button</Button>
      <Dropdown
        overlay={
          <Menu
            items={[
              {
                key: "1",
                label: (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.antgroup.com"
                  >
                    1st menu item
                  </a>
                ),
              },
              {
                key: "2",
                label: (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.aliyun.com"
                  >
                    2nd menu item (disabled)
                  </a>
                ),
                icon: <SmileOutlined />,
                disabled: true,
              },
              {
                key: "3",
                label: (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.luohanacademy.com"
                  >
                    3rd menu item (disabled)
                  </a>
                ),
                disabled: true,
              },
              {
                key: "4",
                danger: true,
                label: "a danger item",
              },
            ]}
          />
        }
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Menu
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
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
      <Rate allowHalf defaultValue={3.5} />
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
    </Space>
  );
}

export default AntdCompGroup;
