import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect } from "react";
import { Collapse } from "antd";
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
  );
}
export default ControlModuleNode;
