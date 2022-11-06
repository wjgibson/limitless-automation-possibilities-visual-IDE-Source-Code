import React from "react";

export default (props) => {
  return (
    <div className="save__controls">
      <button aria-label="save" onClick={props.save}>
        save
      </button>
      <button aria-label="restore" onClick={props.restore}>
        restore
      </button>
    </div>
  );
};
