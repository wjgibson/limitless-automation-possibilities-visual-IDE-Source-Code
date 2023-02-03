import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect } from "react";
import { Card } from "antd";
import "../Elements/elements.css";
import DownDownMenu from "./dropDownMenu.js";
import Validator from "../utilities/Validator";
import DropDownMenu from "./dropDownMenu.js";

const text = `
This is a user defined description for this node
`;

function SequenceNode({ data }) {
  const reactFlowInstance = useReactFlow();

  const [color, setColor] = useState(data.color);
  const [seqType, setSeqType] = useState(data.seqType);
  const [configId, setConfigId] = useState(data.configId);

  useEffect(() => {
    data.seqType = seqType;
  }, [seqType]);

  useEffect(() => {
    data.color = color;
  }, [color]);

  useEffect(() => {
    data.configId = configId;
  }, [configId]);

  function isValidConnection(connection) {
    return Validator(reactFlowInstance, connection);
  }

  return (
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
          {/* <DownDownMenu
            setSeqLayer={setSeqType}
            setColor={setColor}
            style={{ display: "inline", float: "right" }}
          ></DownDownMenu> */}
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
          <div>
            Type: <DropDownMenu configId={configId}></DropDownMenu>
          </div>
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
  );
}

export default SequenceNode;
