import { Handle, Position } from "reactflow";
import React, {  useState } from "react";
import { Button, Collapse, Divider} from "antd";
import DownDownMenu from "./dropDownMenu.js";
import "../Elements/elements.css";

const { Panel } = Collapse;

function ControlModuleNode({ data }) {
  const setSeqType = (type) => {
    data.sType = type;
  };
let sequenceLayer = 2
 
  const isValidConnection = (connection) => connection.target === "sequence";

  data.opcid = 45;
  setSeqType(1);


  return (
    <div className="conMod">
      <div id="sequenceLayer" ><div id="sequanceLayerBubble">{sequenceLayer}</div></div>
      <p>Control Module</p>
      <DownDownMenu></DownDownMenu>
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



export default ControlModuleNode;
