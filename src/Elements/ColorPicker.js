import { useState } from "react";
import { Input } from "antd";

export default function ColorPicker(props) {
  const [nodeColorPreview, setNodeColorPreview] = useState("white");

  const setNodeColor = () => {
    props.setColor(nodeColorPreview);
  };


  return (
    <Input
      type="color"
      id="dropDownMenuInputSetColor"
      defaultValue={nodeColorPreview}
      onChange={(e) => {
        setNodeColorPreview(e.target.value);
        setNodeColor();
      }}
    ></Input>
  );
}
