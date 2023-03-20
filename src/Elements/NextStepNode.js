import {
  Card,
  Radio,
  Tooltip,
  Modal,
  Layout,
  Input,
  Space,
  Select,
} from "antd";
import React from "react";
import { Handle, Position } from "reactflow";
import { useState } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";

const NextStepNode = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Conditions"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1300}
      >
        <Layout>
          <div style={{ height: 925, width: 1300 }}>
            <Content>
              <div
                className="conditionGrouping"
                id="conditionGrouping1"
                style={{
                  backgroundColor: "black",
                  width: "96%",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                <Space direction="horizontal" size="middle">
                  {" "}
                  <div
                    className="greenSquare"
                    style={{
                      backgroundColor: "Green",
                      height: "25px",
                      width: "25px",
                      borderColor: "blue",
                      borderRadius: "3px",
                      margin: "5px",
                    }}
                  ></div>
                  <h2>Condition Group 1</h2>
                  <h2>Type: 2</h2>
                  <h2>
                    Next Step: <Select style={{ width: 200 }}></Select>
                  </h2>
                  <h2>Parameter Details</h2>
                </Space>
              </div>

              <div style={{ margin: "auto", paddingLeft: "120px" }}>
                <Space direction="horizontal" size={150}>
                  <Space direction="vertical" size="small">
                    <h2>Condition A</h2>

                    <Space.Compact>
                      <label for="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label for="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>
                  <Space direction="vertical" size="small">
                    <h2>Condition B</h2>

                    <Space.Compact>
                      <label for="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label for="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>

                  <Space direction="vertical" size="small">
                    <h2>Condition C</h2>

                    <Space.Compact>
                      <label for="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label for="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>
                </Space>
              </div>
              <div
                className="conditionGrouping"
                id="conditionGrouping1"
                style={{
                  backgroundColor: "black",
                  width: "96%",
                  color: "white",
                  borderRadius: "4px",
                  marginTop: "12px",
                }}
              >
                <Space direction="horizontal" size="middle">
                  {" "}
                  <div
                    className="blueSquare"
                    style={{
                      backgroundColor: "Blue",
                      height: "25px",
                      width: "25px",
                      borderColor: "blue",
                      borderRadius: "3px",
                      margin: "5px",
                    }}
                  ></div>
                  <h2>Condition Group 2</h2>
                  <h2>Type: 2</h2>
                  <h2>
                    Next Step: <Select style={{ width: 200 }}></Select>
                  </h2>
                  <h2>Parameter Details</h2>
                </Space>
              </div>

              <div style={{ margin: "auto", paddingLeft: "120px" }}>
                <Space direction="horizontal" size={150}>
                  <Space direction="vertical" size="small">
                    <h2>Condition A</h2>

                    <Space.Compact>
                      <label for="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label for="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>
                  <Space direction="vertical" size="small">
                    <h2>Condition B</h2>

                    <Space.Compact>
                      <label for="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label for="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>

                  <Space direction="vertical" size="small">
                    <h2>Condition C</h2>

                    <Space.Compact>
                      <label for="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label for="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>
                </Space>
              </div>
              <div
                className="conditionGrouping"
                id="conditionGrouping1"
                style={{
                  backgroundColor: "black",
                  width: "96%",
                  color: "white",
                  borderRadius: "4px",
                  marginTop: "12px",
                }}
              >
                <Space direction="horizontal" size="middle">
                  {" "}
                  <div
                    className="pinkSquare"
                    style={{
                      backgroundColor: "Pink",
                      height: "25px",
                      width: "25px",
                      borderColor: "blue",
                      borderRadius: "3px",
                      margin: "5px",
                    }}
                  ></div>
                  <h2>Condition Group 3</h2>
                  <h2>Type: 2</h2>
                  <h2>
                    Next Step: <Select style={{ width: 200 }}></Select>
                  </h2>
                  <h2>Parameter Details</h2>
                </Space>
              </div>

              <div style={{ margin: "auto", paddingLeft: "120px" }}>
                <Space direction="horizontal" size={150}>
                  <Space direction="vertical" size="small">
                    <h2>Condition A</h2>

                    <Space.Compact>
                      <label for="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label for="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>
                  <Space direction="vertical" size="small">
                    <h2>Condition B</h2>

                    <Space.Compact>
                      <label for="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label for="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>

                  <Space direction="vertical" size="small">
                    <h2>Condition C</h2>

                    <Space.Compact>
                      <label for="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label for="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label for="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>
                </Space>
              </div>
            </Content>
          </div>
        </Layout>
      </Modal>

      <Card
        title={
          <div className="drag-handle">
            <h3
              style={{
                display: "inline",
                color: "white",
                mixBlendMode: "difference",
              }}
            >
              Next Step
              <Tooltip placement="bottom" title={"Conditions"}>
                <a
                  style={{
                    position: "relative",
                    left: "125px",
                    color: "white",
                  }}
                  onClick={showModal}
                >
                  <UnorderedListOutlined />
                </a>
              </Tooltip>
            </h3>
          </div>
        }
        bordered={false}
        style={{
          width: 300,
          mixBlendMode: "difference",
        }}
      >
        <div>
          <Handle
            type="target"
            position={Position.Bottom}
            id="a"
            style={{ left: 10 }}
            isConnectable={value == 3 || value == 2}
          />

          <Handle type="target" position={Position.Bottom} id="b" />
          <Handle
            type="target"
            position={Position.Bottom}
            id="c"
            style={{ marginLeft: 140 }}
            isConnectable={value == 3}
          />
        </div>

        <Handle type="source" position={Position.Top} />
        <p style={{ margin: 0, fontSize: "10px" }}>Step Type</p>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>1</Radio>
          <Radio value={2}>2</Radio>
          <Radio value={3}>3</Radio>
        </Radio.Group>
      </Card>
    </>
  );
};

export default NextStepNode;
