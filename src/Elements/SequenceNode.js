import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect, useCallback } from "react";
import { Card, message } from "antd";
import "../Elements/elements.css";
import Validator from "../utilities/Validator";
import SeqTypeSelectMenu from "./SeqTypeSelectMenu.js";
import ColorPicker from "./ColorPicker";

const text = `
This is a user defined description for this node
`;

function SequenceNode({ data }) {
  const reactFlowInstance = useReactFlow();

  const [messageApi, contextHolder] = message.useMessage();
  const [color, setColor] = useState(data.color);
  const [seqType, setSeqType] = useState(data.type);
  const [configId, setConfigId] = useState(data.configId);
  const [invalidFlag, setInvalidFlag] = useState(false);

  useEffect(() => {
    data.type = seqType;
    console.log(seqType);
  }, [seqType]);

  useEffect(() => {
    data.color = color;
  }, [color]);

  useEffect(() => {
    data.configId = configId;
  }, [configId]);

  useEffect(() => {
    if (invalidFlag) {
      invalidConnectionMessage();
      setInvalidFlag((flag) => !flag);
    }
  }, [invalidFlag]);

  const invalidConnectionMessage = useCallback(() => {
    if (invalidFlag) {
      messageApi.open({
        type: "error",
        content: "This connection is invalid!",
      });
    }
  }, [invalidFlag]);

  function isValidConnection(connection) {
    let connectionValidity = Validator(reactFlowInstance, connection);

    if (!connectionValidity && !invalidFlag) {
      setInvalidFlag(true);
    }
    return connectionValidity;
  }

  return (
    <>
      {contextHolder}
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
              Sequence
            </h3>
          </div>
        }
        bordered={false}
        style={{
          width: 300,
          backgroundColor: color,
          mixBlendMode: "difference",
        }}
      >
        <div>
          <div>
            <div>
              <SeqTypeSelectMenu
                configId={configId}
                setSeqType={setSeqType}
                seqType={seqType}
              ></SeqTypeSelectMenu>
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
    </>
  );
}

export default SequenceNode;
