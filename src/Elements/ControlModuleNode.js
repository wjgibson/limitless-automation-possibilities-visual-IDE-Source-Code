import { Handle, Position } from "reactflow";

import React from "react";
import { Collapse, Divider, Badge } from "antd";
import "../Elements/elements.css";

const { Panel } = Collapse;

const text = `
This is a user defined description for this node
`;

function ControlModuleNode({ data }) {
  data.sType = 0;

  const incSeqType = () => {
    data.sType++;
    console.log(data.sType);
  };
  //Making the validation rule state that the id must be the string "sequence" wont work as ids must be unique among every node
  // const isValidConnection = (connection) => connection.target === "sequence";

  //Doesn't work because the connection.target only has access to a node's id, not any other info
  const isValidConnection = (connection) => connection.target <= data.sType;

  data.uid = 45;
  return (
    <div className="conMod">
      <button onClick={incSeqType}>Increment Level</button>
      <Badge count={data.sType}></Badge>
      <p>Control Module</p>
      <Divider />
      <Collapse accordion>
        <Panel header="Description" key="1">
          <p>opcid: {data.opcid}</p>
          <p>seqType: {data.sType}</p>
          <p>{text}</p>
        </Panel>
      </Collapse>
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
