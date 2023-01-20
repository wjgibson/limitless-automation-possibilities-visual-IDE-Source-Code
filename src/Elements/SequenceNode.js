import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect, useCallback } from "react";
import { Card, message } from "antd";
import "../Elements/elements.css";
import DownDownMenu from "./dropDownMenu.js";
import Validator from "../resources/Validator";

function SequenceNode({ data }) {
  const reactFlowInstance = useReactFlow();

  const [messageApi, contextHolder] = message.useMessage();
  const [color, setColor] = useState(data.color);
  const [seqType, setSeqType] = useState(data.seqType);
  const [invalidFlag, setInvalidFlag] = useState(false);

  const invalidConnectionMessage = useCallback(() => {
    if (invalidFlag) {
      messageApi.open({
        type: "error",
        content: "This connection is invalid!",
      });
    }
  }, [invalidFlag]);

  useEffect(() => {
    data.seqType = seqType;
  }, [seqType]);

  useEffect(() => {
    data.color = color;
  }, [color]);

  useEffect(() => {
    console.log("this has been an invalid fglaf", invalidFlag);
    if (invalidFlag) {
      invalidConnectionMessage();
      setInvalidFlag((flag) => !flag);
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
            onConnect={(params) => console.log("handle onConnect", params)}
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
