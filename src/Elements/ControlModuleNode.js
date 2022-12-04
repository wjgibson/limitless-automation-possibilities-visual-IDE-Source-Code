import { Handle, Position, useReactFlow } from "reactflow";

import { memo, React, useState } from "react";
import "../Elements/elements.css";
import Validator from "../resources/Validator";

const text = `
This is a user defined description for this node
`;

const ControlModuleNode = memo(({ data }) => {
  const [seqType, setSeqType] = useState(0);
  const reactFlowInstance = useReactFlow();

  function isValidConnection(connection) {
    Validator(reactFlowInstance, connection);
  }

  function incSeqType() {
    setSeqType(seqType + 1);
  }

  data.uid = 45;
  return (
    <div className="conMod">
      {/* <button onClick={incSeqType()}>Click me</button> */}
      <p>{seqType}</p>
      {/* <Badge count={data.sType}></Badge> */}
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
});

export default ControlModuleNode;
