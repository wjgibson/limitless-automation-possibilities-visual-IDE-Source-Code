import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect } from "react";
import { Collapse } from "antd";
import "../Elements/elements.css";
import DownDownMenu from "./dropDownMenu.js";
import Validator from "../resources/Validator";

const text = `
This is a user defined description for this node
`;

function SequenceNode({ data }) {
  const reactFlowInstance = useReactFlow();

  const [color, setColor] = useState();
  const [seqType, setSeqType] = useState(1);

  useEffect(() => {
    data.seqType = seqType;
  }, [seqType]);

  useEffect(() => {
    data.color = color;
  }, [color]);

  function isValidConnection(connection) {
    return Validator(reactFlowInstance, connection);
  }

  data.opcid = 45;

  return (
    <div
      className="conMod"
      style={{ backgroundImage: "radial-gradient(white 25%, " + color + ")" }}
    >
      <DownDownMenu setSeqLayer={setSeqType} setColor={setColor}></DownDownMenu>
      <div id="sequenceLayer">
        <div id="sequanceLayerBubble">{seqType}</div>
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
  );
}

export default SequenceNode;
