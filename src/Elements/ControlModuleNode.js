import { Handle, Position } from "reactflow";
import React, {  useState } from "react";
import { Button, Collapse, Divider, Space} from "antd";
import DownDownMenu from "./DropDownMenu.js";
import "../Elements/elements.css";

const { Panel } = Collapse;

function ControlModuleNode({ data }) {
  const setSeqType = (type) => {
    data.sType = type;
  };

  const[color, setColor]= useState()
  const [sequenceLayer, setSeqLayer] = useState(1)

  const isValidConnection = (connection) => connection.target === "sequence";

  data.opcid = 45;
  setSeqType(1);


  return (
    
    <div className="conMod" style={{backgroundImage: "radial-gradient(white 25%, "+color+")"}}>
      <Space warp>
      <DownDownMenu setSeqLayer={setSeqLayer} setColor={setColor}></DownDownMenu>
      <div id="sequenceLayer" ><div id="sequanceLayerBubble">{sequenceLayer}</div></div>
      <p>Control Module</p>
      </Space>
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
