import { Handle, Position } from "reactflow";

import React from "react";
import { Collapse, Divider } from "antd";
import styles from "../Elements/elements.css";
const { Panel } = Collapse;

const text = `
This is a user defined description for this node
`;

//How to define style and location for handles. Might be used later
const handleStyle = { left: 10 };

function ControlModuleNode({ data }) {
  const setSeqType = (type) => {
    data.sType = type;
  };

  data.opcid = 45;
  setSeqType(2);

  return (
    <div className={styles.conMod}>
      <p>Control Module</p>
      <Divider />
      <Collapse accordion>
        <Panel header="Description" key="1">
          <p>opcid: {data.opcid}</p>
          <p>seqType: {data.sType}</p>
        </Panel>
      </Collapse>
      <Handle type="source" position={Position.Top} id="cModIN" />
      <Handle type="source" position={Position.Bottom} id="cModOut" />
    </div>
  );
}

export default ControlModuleNode;
