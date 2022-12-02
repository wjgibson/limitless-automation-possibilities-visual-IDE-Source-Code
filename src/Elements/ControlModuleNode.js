import { Handle, Position } from "reactflow";

import React from "react";
import { Collapse, Divider, Badge } from "antd";
import "../Elements/elements.css";
//import for monitoring service
// import cvaldi from 'sdfsdfsdf'

const { Panel } = Collapse;

const text = `
This is a user defined description for this node
`;

//How to define style and location for handles. Might be used later
// const handleStyle = { left: 10 };

function ControlModuleNode({ data }) {
  data.sType = 0;

  const incSeqType = () => {
    data.sType++;
    console.log(data.sType);
  };

  //could make a monitor service that custom node files and this file will call
  // const isValidConnection = cvalid.validate(source_ID, target_ID);
  // const isValidConnection = (connection, instance) => {
  //   let flow = instance.toObject();
  //   let print = JSON.stringify(flow);
  //   console.log(print);
  // };

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
        // isValidConnection={isValidConnection}
        level={data.sType}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        // isValidConnection={isValidConnection}
        level={data.sType}
      />
    </div>
  );
}

export default ControlModuleNode;
