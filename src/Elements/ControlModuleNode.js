import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect } from "react";
import { Card } from "antd";
import DownDownMenu from "./dropDownMenu.js";
import "../Elements/elements.css";
import Validator from "../utilities/Validator";

function ControlModuleNode({ data }) {
  const reactFlowInstance = useReactFlow();

  const [configId, setConfigId] = useState(data.configId);
  const [isNewFlag, setIsNewFlag] = useState(data.isNew);
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
            Control Module
          </h3>
        </div>
      }
      bordered={false}
      style={{
        width: 300,
        mixBlendMode: "difference",
      }}
    >
      <div className="dynamicTextColor">
        <p>Control Module</p>
        <Handle
          type="target"
          position={Position.Top}
          isValidConnection={isValidConnection}
        />
      </div>
    </Card>
  );
}
export default ControlModuleNode;
