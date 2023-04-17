import { useEffect, useState } from "react";
import { Input } from "antd";
export default function ColorPicker(props) {
  const [nodeColorPreview, setNodeColorPreview] = useState(
    props.initialColor
  );
  const [interacted, setInteracted] = useState(false);


  const setNodeColorActual = () => {
    props.setColor(nodeColorPreview);
  };

  const setInteractedWith = () => {
      props.setInteracted(interacted);
  }

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
          setInteracted(true);
          setNodeColorActual();
          setInteractedWith();

        }}
      ></Input>
    </div>
  );
}
