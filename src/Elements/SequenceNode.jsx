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

function SequenceNode({ data }) {
    const setSeqType = (type) => {
        data.sType = type;
    };
    const isValidConnection = ((connection) => connection.source=== "step")
        && ((connection) => connection.source === "caste2");
    //Needs incrementation


    data.opcid = 45;
    setSeqType(1);
    // 3+ ?

    return (
        <div className={styles.conMod}>
            <Badge count={data.sType}></Badge>
            <p>Sequence</p>
            {/*
      <Divider />
      <Collapse accordion>
        <Panel header="Description" key="1">
          <p>opcid: {data.opcid}</p>
          <p>seqType: {data.sType}</p>
        </Panel>
      </Collapse>
      */}
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