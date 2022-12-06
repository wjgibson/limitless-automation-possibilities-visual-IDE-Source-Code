import { Handle, Position } from "reactflow";

import React from "react";
import { Collapse, Divider, Badge } from "antd";
import styles from "../Elements/elements.css";
const { Panel } = Collapse;

const text = `
This is a user defined description for this node
`;

//How to define style and location for handles. Might be used later
// const handleStyle = { left: 10 };

function ControlModuleNode({ data }) {
  const setSeqType = (type) => {
    data.sType = type;
  };

  const isValidConnection = (connection) => connection.target === "controlModule";
    //bottom connection connects to any target connection part of another node due to some non constraint
    // Important for later as a null is needed unless ControlModule connects to something lower
    //*Something Lower* would need a null instead to block.
  data.opcid = 45;
  setSeqType(1);

  return (
    <div className={styles.conMod}>
      <Badge count={data.sType}></Badge>
      <p>Control Module</p>
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
