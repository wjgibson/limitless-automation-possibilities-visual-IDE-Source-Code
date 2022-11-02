import React from "react";

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the left.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "sequence")}
        draggable
      >
        Sequence
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "step")}
        draggable
      >
        Step
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "control module")}
        draggable
      >
        Control Module
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "caste 2 sequence")}
        draggable
      >
        Caste 2 Sequence
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};
