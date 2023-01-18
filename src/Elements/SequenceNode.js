import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect } from "react";
import { Card, message } from "antd";
import "../Elements/elements.css";
import DownDownMenu from "./dropDownMenu.js";
import Validator from "../resources/Validator";

const text = `
This is a user defined description for this node
`;

function SequenceNode({ data }) {
  const reactFlowInstance = useReactFlow();

  const [messageApi, contextHolder] = message.useMessage();
  const [color, setColor] = useState(data.color);
  const [seqType, setSeqType] = useState(data.seqType);

  const info = () => {
    messageApi.info("This connection is invalid!");
  };

  useEffect(() => {
    console.log(data);
  }, []);

  useEffect(() => {
    data.seqType = seqType;
  }, [seqType]);

  useEffect(() => {
    data.color = color;
  }, [color]);

  function isValidConnection(connection) {
    const connectionValidity = Validator(reactFlowInstance, connection);
    notifyInvalidConnection(connectionValidity);
    return connectionValidity;
  }

  function notifyInvalidConnection(connectionValidity) {
    if (connectionValidity == false) {
      {
        info();
      }
    }
  }

  data.opcid = 45;

  return (
    <>
      {contextHolder}
      <Card
        title={
          <div>
            <h3
              style={{
                display: "inline",
                color: "white",
                mixBlendMode: "difference",
              }}
            >
              Sequence
            </h3>
            <DownDownMenu
              setSeqLayer={setSeqType}
              setColor={setColor}
              style={{ display: "inline", float: "right" }}
            ></DownDownMenu>
          </div>
        }
        bordered={false}
        style={{
          width: 300,
          backgroundColor: color,
          mixBlendMode: "difference",
        }}
      >
        <div className="dynamicTextColor">
          <div>
            <div>Type: {seqType}</div>
          </div>
          <p>Sequence</p>
          <Handle
            type="target"
            position={Position.Top}
            isValidConnection={isValidConnection}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            isValidConnection={isValidConnection}
          />
        </div>
      </Card>
    </>
  );
}

export default SequenceNode;
