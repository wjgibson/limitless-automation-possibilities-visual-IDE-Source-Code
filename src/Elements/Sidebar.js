import React from "react";

export default ({ onChange = () => {} }) => {
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
        aria-label="input"
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
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
        aria-label="step"
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "step")}
        draggable
      >
        Step
      </div>
      <div
        aria-label="controlModule"
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "control module")}
        draggable
      >
        Control Module
      </div>
      <div
        aria-label="caste2"
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "caste 2 sequence")}
        draggable
      >
        Caste 2 Sequence
      </div>
      <div
        aria-label="output"
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};
