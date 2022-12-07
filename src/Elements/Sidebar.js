//import all types and create components in a loop
import React from "react";
import { Button, Space } from "antd";

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div aria-label="description" className="description">
        You can drag these nodes to the pane on the left.
      </div>
      <div
        aria-label="sequence"
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "sequence")}
        draggable
      >
        Sequence
      </div>
      <div
        aria-label="controlModule"
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "controlModule")}
        draggable
      >
        Control Module
      </div>
      <div
        aria-label="caste2"
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "caste2")}
        draggable
      >
        Caste 2 Sequence
      </div>
    </aside>
  );
};
