import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect } from "react";
import { Collapse, Card } from "antd";
import DownDownMenu from "./dropDownMenu.js";
import "../Elements/elements.css";
import Validator from "../resources/Validator";

const { Panel } = Collapse;

function ControlModuleNode({ data }) {
  const reactFlowInstance = useReactFlow();

  const [color, setColor] = useState();
  const [seqType, setSeqType] = useState(1);

  useEffect(() => {
    data.seqType = seqType;
  }, [seqType]);

  useEffect(() => {
    data.color = color;
    console.log(color);
  }, [color]);

  function isValidConnection(connection) {
    return Validator(reactFlowInstance, connection);
  }
  data.opcid = 45;

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
            Control Module
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
        <p>Control Module</p>
        <Handle
          type="target"
          position={Position.Top}
          isValidConnection={isValidConnection}
          level={data.sType}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          isValidConnection={isValidConnection}
          level={data.sType}
        />
      </div>
    </Card>
  );
}
export default ControlModuleNode;
