import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect } from "react";
import { Card, Input } from "antd";
import ControlModuleSelectMenu from "./ControlModuleSelectMenu.js";
import "../Elements/elements.css";

import { Validator } from "../utilities/Validator";
import ColorPicker from "./ColorPicker";

function ControlModuleNode({ data }) {
  const reactFlowInstance = useReactFlow();

  const [configId, setConfigId] = useState(data.configId);
  const [controlModuleType, setControlModuleType] = useState(data.type);
  const [controlModuleTypeList, setControlModuleTypeList] = useState([]);
  const [cardTitle, setCardTitle] = useState(
    data.name ? data.name : "Control Module"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [nodeType, setNodeType] = useState("Control Module");

  const [color, setColor] = useState(data.color);
  const [colorInteracted, setColorInteracted] = useState(
    data.colorInteracted ? data.colorInteracted : false
  );

  useEffect(() => {
    data.color = color;
  }, [color]);

  useEffect(() => {
    data.colorInteracted = colorInteracted;
  }, [colorInteracted]);

  useEffect(() => {
    data.seqType = "c|1";
  }, []);

  useEffect(() => {
    data.configId = configId;
    data.seqType = "c|1";
  }, [configId]);

  useEffect(() => {
    data.name = newTitle;
  }, [newTitle]);

  useEffect(() => {
    data.type = controlModuleType;
  }, [controlModuleType]);

  useEffect(() => {
    data.nodeType = nodeType;
  }, []);

  function isValidConnection(connection) {
    return Validator(reactFlowInstance, connection);
  }

  const handleDoubleClick = () => {
    setIsEditing(true);
    setNewTitle(cardTitle);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleTitleSave = () => {
    setCardTitle(newTitle);
    setIsEditing(false);
  };

  const handleTitleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (colorInteracted) {
      data.color = color;
    } else {
      if (controlModuleType != undefined && controlModuleTypeList.length != 0) {
        switch (controlModuleType.split("|")[0]) {
          case controlModuleTypeList[0].typeuuid:
            setColor("red");
            break;
          case controlModuleTypeList[1].typeuuid:
            setColor("green");
            break;
          case controlModuleTypeList[2].typeuuid:
            setColor("blue");
            break;
          case controlModuleTypeList[3].typeuuid:
            setColor("purple");
            break;
          default:
            data.color = color;
        }
      }
    }
  }, [controlModuleType]);

  return (
    <Card
      title={
        <div className="drag-handle" onDoubleClick={handleDoubleClick}>
          {isEditing ? (
            <Input
              value={newTitle}
              onChange={handleTitleChange}
              onPressEnter={handleTitleSave}
              onBlur={handleTitleCancel}
              autoFocus
            />
          ) : (
            <h3
              style={{
                display: "inline",
                color: "white",
                mixBlendMode: "difference",
              }}
            >
              {cardTitle}
            </h3>
          )}
        </div>
      }
      bordered={false}
      style={{
        width: 300,
        mixBlendMode: "difference",
        backgroundColor: color,
      }}
    >
      <div>
        <ControlModuleSelectMenu
          data-cy="CMTypeSelect"
          configId={configId}
          setControlModuleType={setControlModuleType}
          controlModuleType={controlModuleType}
          setControlModuleTypeList={setControlModuleTypeList}
        ></ControlModuleSelectMenu>
        <p
          style={{
            color: "white",
            mixBlendMode: "difference",
          }}
        >
          Control Module
        </p>
        <Handle
          type="target"
          position={Position.Top}
          isValidConnection={isValidConnection}
        />
      </div>
      <ColorPicker
        initialColor={color}
        setColor={setColor}
        setInteracted={setColorInteracted}
      />
    </Card>
  );
}
export default ControlModuleNode;
