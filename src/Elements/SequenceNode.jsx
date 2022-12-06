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
    const isValidConnection = ((connection) => connection.target === "caste2")
    || ((connection) => connection.target === "sequence")

    //Needs incrementation


    data.opcid = 45;
    setSeqType(1);
    // 3+, or converts to 2?

    return (
        <div className={styles.conMod}>
            <Badge count={data.sType}></Badge>
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