import { useEffect, useState } from "react";
import { Input } from "antd";
import SequenceNode from "./SequenceNode";
export default function ColorPicker(props) {
  const [nodeColorPreview, setNodeColorPreview] = useState(
    props.initialColor || "#FFFFFF"
  );
    const [isInteracted, setIsInteracted] = useState(false);


  const setNodeColorActual = () => {
    props.setColor(nodeColorPreview);
  };

  return (
    <div
      style={{
        width: "20%",
        minWidth: "50px",
        position: "absolute",
        right: 0,
        bottom: 0,
      }}
    >
      <Input
        type="color"
        id="dropDownMenuInputSetColor"
        value={nodeColorPreview}
        onChange={(e) => {
          setNodeColorPreview(e.target.value);
          setNodeColorActual();
          setIsInteracted(true);
        }}
      ></Input>
    </div>
  );
}
