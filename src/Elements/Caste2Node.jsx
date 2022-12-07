import { Handle, Position } from "reactflow";

import { React, useState } from "react";
import { Collapse } from "antd";
import "../Elements/elements.css";
import DownDownMenu from "./dropDownMenu.js";

const { Panel } = Collapse;

const text = `
This is a user defined description for this node
`;

function Caste2Node({ data }) {
  const setSeqType = (type) => {
    data.sType = type;
  };

  const [color, setColor] = useState();
  const [sequenceLayer, setSeqLayer] = useState(1);

  const isValidConnection =
    ((connection) => connection.target === "controlModule") ||
    ((connection) => connection.target === "caste2");

  data.opcid = 45;
  setSeqType(1);

  return (
    <div
      className="conMod"
      style={{ backgroundImage: "radial-gradient(white 25%, " + color + ")" }}
    >
      <DownDownMenu
        setSeqLayer={setSeqLayer}
        setColor={setColor}
      ></DownDownMenu>
      <div id="sequenceLayer">
        <div id="sequanceLayerBubble">{sequenceLayer}</div>
      </div>
      <p>Caste 2 Sequence</p>
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

export default Caste2Node;
