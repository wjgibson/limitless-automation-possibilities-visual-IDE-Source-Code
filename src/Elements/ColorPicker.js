import { useState } from "react";
import { Input } from "antd";

export default function ColorPicker(props) {
  const [nodeColorPreview, setNodeColorPreview] = useState();

  const setNodeColor = () => {
    props.setColor(nodeColorPreview);
  };


  return (
      <div style={{
        width:'20%',
        minWidth:'50px',
        position:'absolute',
        right:0,
        bottom:0,
      }}>
    <Input
      type="color"
      id="dropDownMenuInputSetColor"
      onChange={(e) => {
        setNodeColorPreview(e.target.value);
        setNodeColor();
      }}
    ></Input>
      </div>
  );
}
