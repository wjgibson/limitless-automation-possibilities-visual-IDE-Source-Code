import { useState } from "react";
import { Input } from "antd";

export default function ColorPicker(props) {
  const [nodeColorPreview, setNodeColorPreview] = useState();

  const setNodeColor = () => {
    props.setColor(nodeColorPreview);
  };

  return (
    <Input
      type="color"
      id="dropDownMenuInputSetColor"
      onChange={(e) => {
        setNodeColorPreview(e.target.value);
      }}
    ></Input>
  );
}
