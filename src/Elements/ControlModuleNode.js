import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect } from "react";
import { Card } from "antd";
import ControlModuleSelectMenu from "./ControlModuleSelectMenu.js";
import "../Elements/elements.css";
import Validator from "../utilities/Validator";

function ControlModuleNode({ data }) {
  const reactFlowInstance = useReactFlow();

  const [configId, setConfigId] = useState(data.configId);
  const [controlModuleType, setControlModuleType] = useState(data.type);

  useEffect(() => {
    data.configId = configId;
  }, [configId]);

  useEffect(() => {
    data.type = controlModuleType;
  }, [controlModuleType]);

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
      <div>
        <ControlModuleSelectMenu
          configId={configId}
          setControlModuleType={setControlModuleType}
        ></ControlModuleSelectMenu>
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
