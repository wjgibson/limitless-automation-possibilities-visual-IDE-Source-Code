import {
  Card,
  Radio,
  Tooltip,
  Modal,
  Layout,
  Input,
  Space,
  Select,
  Button,
} from "antd";
import React, { useCallback, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { useState } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

const NextStepNode = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [conditionGroup1Value, setConditionGroup1Value] = useState(1);
  const [conditionGroup2Value, setConditionGroup2Value] = useState(1);
  const [conditionGroup3Value, setConditionGroup3Value] = useState(1);
  const [nextStepConditionGroup1, setNextStepConditionGroup1] = useState();
  const [nextStepConditionGroup2, setNextStepConditionGroup2] = useState();
  const [nextStepConditionGroup3, setNextStepConditionGroup3] = useState();
  const [valueNextSteps1, setvalueNextSteps1] = useState();
  const [valueNextSteps2, setvalueNextSteps2] = useState();
  const [valueNextSteps3, setvalueNextSteps3] = useState();
  const [stepTitle, setStepTitle] = useState(
    props.data.name ? props.data.name : "Next Step"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  var nodesOnPage = [];

  const fillNodesOnPage = () => {
    nodesOnPage = [];
    for (let i = 0; i < props.data.nodes.length; i++) {
      nodesOnPage.push({
        label: props.data.nodes[i].id,
        value: props.data.nodes[i].id,
      });
    }
  };
  useEffect(() => {
    console.log(props.data.checkEdges);
    // create a new copy of the edges array

    for (let i = 0; i < props.data.edges.length; i++) {
      if (
        props.id == props.data.edges[i].target &&
        props.data.edges[i].targetHandle == "a"
      ) {
        const newEdges = [...props.data.edges];
        newEdges[i].style = { stroke: "green" };
        setvalueNextSteps1(newEdges[i].source);
        props.data.setEdges(newEdges);
        break; // exit the loop since we've found the matching edge
      }
      if (
        props.id == props.data.edges[i].target &&
        props.data.edges[i].targetHandle == "b"
      ) {
        const newEdges = [...props.data.edges];
        newEdges[i].style = { stroke: "blue" };
        setvalueNextSteps2(newEdges[i].source);
        props.data.setEdges(newEdges);
        break; // exit the loop since we've found the matching edge
      }
      if (
        props.id == props.data.edges[i].target &&
        props.data.edges[i].targetHandle == "c"
      ) {
        const newEdges = [...props.data.edges];
        newEdges[i].style = { stroke: "pink" };
        setvalueNextSteps3(newEdges[i].source);
        props.data.setEdges(newEdges);
        break; // exit the loop since we've found the matching edge
      }
    }
  }, [props.data.checkEdges, props.data.edges, props.data.nodes]);

  useEffect(() => {
    fillNodesOnPage();
    setNextStepConditionGroup1(nodesOnPage);
    setNextStepConditionGroup2(nodesOnPage);
    setNextStepConditionGroup3(nodesOnPage);
  }, [props.data.nodes]);

  const onChange = (e) => {
    setValue(e.target.value);
    console.log(props.data.nodes);
  };

  const onGroup1Change = (e) => {
    setConditionGroup1Value(e.target.value);
  };
  const onGroup2Change = (e) => {
    setConditionGroup2Value(e.target.value);
  };
  const onGroup3Change = (e) => {
    setConditionGroup3Value(e.target.value);
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
  const doubleClickChangeInitialze = () => {
    setIsEditing(true);

    setNewTitle(stepTitle);
  };
  const changeHandler = (event) => {
    setNewTitle(event.target.value);
  };
  const saveHandler = () => {
    setStepTitle(newTitle);
    setIsEditing(false);
  };
  const cancelHandler = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    props.data.name = newTitle;
  }, [newTitle]);
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
                    Next Step:{" "}
                    <Select
                      style={{ width: 200 }}
                      options={nextStepConditionGroup1}
                      value={valueNextSteps1}
                    ></Select>
                  </h2>
                  <h2>Parameter Details</h2>
                  <Radio.Group
                    onChange={onGroup1Change}
                    value={conditionGroup1Value}
                    style={{ color: "white" }}
                  >
                    <Radio value={1} style={{ color: "white" }}>
                      1
                    </Radio>
                    <Radio value={2} style={{ color: "white" }}>
                      2
                    </Radio>
                    <Radio value={3} style={{ color: "white" }}>
                      3
                    </Radio>
                  </Radio.Group>
                </Space>
              </div>

              <div style={{ margin: "auto", paddingLeft: "120px" }}>
                <Space direction="horizontal" size={150}>
                  <Space direction="vertical" size="small">
                    <h2>Condition A</h2>
                    <Space.Compact>
                      <label htmlFor="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label htmlFor="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label htmlFor="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label htmlFor="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>

                  <Space
                    direction="vertical"
                    size="small"
                    style={{
                      visibility:
                        conditionGroup1Value == 1 ? "hidden" : "visible",
                    }}
                  >
                    <h2>Condition B</h2>

                    <Space.Compact>
                      <label htmlFor="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label htmlFor="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label htmlFor="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label htmlFor="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>

                  <Space
                    direction="vertical"
                    size="small"
                    style={{
                      visibility:
                        conditionGroup1Value == 3 ? "visible" : "hidden",
                    }}
                  >
                    <h2>Condition C</h2>

                    <Space.Compact>
                      <label htmlFor="SubSequence" style={{ margin: 5 }}>
                        SubSequence:{" "}
                      </label>
                      <Select id="SubSequence" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      <label htmlFor="SetPoint" style={{ margin: 5 }}>
                        SetPoint:{" "}
                      </label>{" "}
                      <Input id="SetPoint" style={{ width: 120 }}></Input>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label htmlFor="Operator" style={{ margin: 5 }}>
                        Operator:{" "}
                      </label>{" "}
                      <Select id="Operator" style={{ width: 120 }}></Select>
                    </Space.Compact>

                    <Space.Compact>
                      {" "}
                      <label htmlFor="Time" style={{ margin: 5 }}>
                        Time:{" "}
                      </label>{" "}
                      <Input id="Time" style={{ width: 120 }}></Input>
                    </Space.Compact>
                  </Space>
                </Space>
              </div>
              <div
                style={{
                  visibility: value == 3 || value == 2 ? "visible" : "hidden",
                }}
              >
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
                      Next Step:{" "}
                      <Select
                        style={{ width: 200 }}
                        options={nextStepConditionGroup2}
                        value={valueNextSteps2}
                      ></Select>
                    </h2>
                    <h2>Parameter Details</h2>
                    <Radio.Group
                      onChange={onGroup2Change}
                      value={conditionGroup2Value}
                      style={{ color: "white" }}
                    >
                      <Radio value={1} style={{ color: "white" }}>
                        1
                      </Radio>
                      <Radio value={2} style={{ color: "white" }}>
                        2
                      </Radio>
                      <Radio value={3} style={{ color: "white" }}>
                        3
                      </Radio>
                    </Radio.Group>
                  </Space>
                </div>

                <div style={{ margin: "auto", paddingLeft: "120px" }}>
                  <Space direction="horizontal" size={150}>
                    <Space direction="vertical" size="small">
                      <h2>Condition A</h2>

                      <Space.Compact>
                        <label htmlFor="SubSequence" style={{ margin: 5 }}>
                          SubSequence:{" "}
                        </label>
                        <Select
                          id="SubSequence"
                          style={{ width: 120 }}
                        ></Select>
                      </Space.Compact>

                      <Space.Compact>
                        <label htmlFor="SetPoint" style={{ margin: 5 }}>
                          SetPoint:{" "}
                        </label>{" "}
                        <Input id="SetPoint" style={{ width: 120 }}></Input>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Operator" style={{ margin: 5 }}>
                          Operator:{" "}
                        </label>{" "}
                        <Select id="Operator" style={{ width: 120 }}></Select>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Time" style={{ margin: 5 }}>
                          Time:{" "}
                        </label>{" "}
                        <Input id="Time" style={{ width: 120 }}></Input>
                      </Space.Compact>
                    </Space>
                    <Space
                      direction="vertical"
                      size="small"
                      style={{
                        visibility:
                          (conditionGroup2Value != 1 && value == 2) ||
                          (conditionGroup2Value != 1 && value == 3)
                            ? "visible"
                            : "hidden",
                      }}
                    >
                      <h2>Condition B</h2>

                      <Space.Compact>
                        <label htmlFor="SubSequence" style={{ margin: 5 }}>
                          SubSequence:{" "}
                        </label>
                        <Select
                          id="SubSequence"
                          style={{ width: 120 }}
                        ></Select>
                      </Space.Compact>

                      <Space.Compact>
                        <label htmlFor="SetPoint" style={{ margin: 5 }}>
                          SetPoint:{" "}
                        </label>{" "}
                        <Input id="SetPoint" style={{ width: 120 }}></Input>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Operator" style={{ margin: 5 }}>
                          Operator:{" "}
                        </label>{" "}
                        <Select id="Operator" style={{ width: 120 }}></Select>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Time" style={{ margin: 5 }}>
                          Time:{" "}
                        </label>{" "}
                        <Input id="Time" style={{ width: 120 }}></Input>
                      </Space.Compact>
                    </Space>

                    <Space
                      direction="vertical"
                      size="small"
                      style={{
                        visibility:
                          (conditionGroup2Value == 3 && value == 2) ||
                          (conditionGroup2Value == 3 && value == 3)
                            ? "visible"
                            : "hidden",
                      }}
                    >
                      <h2>Condition C</h2>

                      <Space.Compact>
                        <label htmlFor="SubSequence" style={{ margin: 5 }}>
                          SubSequence:{" "}
                        </label>
                        <Select
                          id="SubSequence"
                          style={{ width: 120 }}
                        ></Select>
                      </Space.Compact>

                      <Space.Compact>
                        <label htmlFor="SetPoint" style={{ margin: 5 }}>
                          SetPoint:{" "}
                        </label>{" "}
                        <Input id="SetPoint" style={{ width: 120 }}></Input>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Operator" style={{ margin: 5 }}>
                          Operator:{" "}
                        </label>{" "}
                        <Select id="Operator" style={{ width: 120 }}></Select>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Time" style={{ margin: 5 }}>
                          Time:{" "}
                        </label>{" "}
                        <Input id="Time" style={{ width: 120 }}></Input>
                      </Space.Compact>
                    </Space>
                  </Space>
                </div>
              </div>

              <div style={{ visibility: value == 3 ? "visible" : "hidden" }}>
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
                      Next Step:{" "}
                      <Select
                        style={{ width: 200 }}
                        options={nextStepConditionGroup3}
                        value={valueNextSteps3}
                      ></Select>
                    </h2>
                    <h2>Parameter Details</h2>
                    <Radio.Group
                      onChange={onGroup3Change}
                      value={conditionGroup3Value}
                      style={{ color: "white" }}
                    >
                      <Radio value={1} style={{ color: "white" }}>
                        1
                      </Radio>
                      <Radio value={2} style={{ color: "white" }}>
                        2
                      </Radio>
                      <Radio value={3} style={{ color: "white" }}>
                        3
                      </Radio>
                    </Radio.Group>
                  </Space>
                </div>

                <div style={{ margin: "auto", paddingLeft: "120px" }}>
                  <Space direction="horizontal" size={150}>
                    <Space direction="vertical" size="small">
                      <h2>Condition A</h2>

                      <Space.Compact>
                        <label htmlFor="SubSequence" style={{ margin: 5 }}>
                          SubSequence:{" "}
                        </label>
                        <Select
                          id="SubSequence"
                          style={{ width: 120 }}
                        ></Select>
                      </Space.Compact>

                      <Space.Compact>
                        <label htmlFor="SetPoint" style={{ margin: 5 }}>
                          SetPoint:{" "}
                        </label>{" "}
                        <Input id="SetPoint" style={{ width: 120 }}></Input>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Operator" style={{ margin: 5 }}>
                          Operator:{" "}
                        </label>{" "}
                        <Select id="Operator" style={{ width: 120 }}></Select>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Time" style={{ margin: 5 }}>
                          Time:{" "}
                        </label>{" "}
                        <Input id="Time" style={{ width: 120 }}></Input>
                      </Space.Compact>
                    </Space>
                    <Space
                      direction="vertical"
                      size="small"
                      style={{
                        visibility:
                          (conditionGroup3Value == 2 && value == 3) ||
                          (conditionGroup3Value == 3 && value == 3)
                            ? "visible"
                            : "hidden",
                      }}
                    >
                      <h2>Condition B</h2>

                      <Space.Compact>
                        <label htmlFor="SubSequence" style={{ margin: 5 }}>
                          SubSequence:{" "}
                        </label>
                        <Select
                          id="SubSequence"
                          style={{ width: 120 }}
                        ></Select>
                      </Space.Compact>

                      <Space.Compact>
                        <label htmlFor="SetPoint" style={{ margin: 5 }}>
                          SetPoint:{" "}
                        </label>{" "}
                        <Input id="SetPoint" style={{ width: 120 }}></Input>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Operator" style={{ margin: 5 }}>
                          Operator:{" "}
                        </label>{" "}
                        <Select id="Operator" style={{ width: 120 }}></Select>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Time" style={{ margin: 5 }}>
                          Time:{" "}
                        </label>{" "}
                        <Input id="Time" style={{ width: 120 }}></Input>
                      </Space.Compact>
                    </Space>

                    <Space
                      direction="vertical"
                      size="small"
                      style={{
                        visibility:
                          conditionGroup3Value == 3 && value == 3
                            ? "visible"
                            : "hidden",
                      }}
                    >
                      <h2>Condition C</h2>

                      <Space.Compact>
                        <label htmlFor="SubSequence" style={{ margin: 5 }}>
                          SubSequence:{" "}
                        </label>
                        <Select
                          id="SubSequence"
                          style={{ width: 120 }}
                        ></Select>
                      </Space.Compact>

                      <Space.Compact>
                        <label htmlFor="SetPoint" style={{ margin: 5 }}>
                          SetPoint:{" "}
                        </label>{" "}
                        <Input id="SetPoint" style={{ width: 120 }}></Input>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Operator" style={{ margin: 5 }}>
                          Operator:{" "}
                        </label>{" "}
                        <Select id="Operator" style={{ width: 120 }}></Select>
                      </Space.Compact>

                      <Space.Compact>
                        {" "}
                        <label htmlFor="Time" style={{ margin: 5 }}>
                          Time:{" "}
                        </label>{" "}
                        <Input id="Time" style={{ width: 120 }}></Input>
                      </Space.Compact>
                    </Space>
                  </Space>
                </div>
              </div>
            </Content>
          </div>
        </Layout>
      </Modal>

      <Card
        title={
          <div
            className="drag-handle"
            onDoubleClick={doubleClickChangeInitialze}
          >
            {isEditing ? (
              <Input
                value={newTitle}
                onChange={changeHandler}
                onPressEnter={saveHandler}
                onBlur={cancelHandler}
                autofocus
                autoSize={true}
              />
            ) : (
              <h3
                style={{
                  display: "inline",
                  color: "white",
                  mixBlendMode: "difference",
                }}
              >
                {stepTitle}
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
            )}
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
          />

          <Handle
            type="target"
            position={Position.Bottom}
            id="b"
            isConnectable={value == 3 || value == 2}
            style={{ background: value == 1 ? "red" : "black" }}
          />
          <Handle
            type="target"
            position={Position.Bottom}
            id="c"
            style={{
              marginLeft: 140,
              background: value == 3 ? "black" : "red",
            }}
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
