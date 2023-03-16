import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect } from "react";
import {Card, Input} from "antd";
import ControlModuleSelectMenu from "./ControlModuleSelectMenu.js";
import "../Elements/elements.css";
import Validator from "../utilities/Validator";
import ColorPicker from "./ColorPicker";

function ControlModuleNode({ data }) {
  const reactFlowInstance = useReactFlow();

  const [configId, setConfigId] = useState(data.configId);
  const [controlModuleType, setControlModuleType] = useState(data.type);
  const [cardTitle, setCardTitle] = useState(data.name ? data.name : "Control Module");
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const [selectedColor, setSelectedColor] = useState("white");


  useEffect(() => {
    data.seqType = "c|1";
  }, []);

  useEffect(() => {
    data.configId = configId;
    data.seqType = "c|1";
  }, [configId]);

  useEffect( () => {
    data.name = newTitle;
  }, [newTitle]);

  useEffect(() => {
    data.type = controlModuleType + "|1";
  }, [controlModuleType]);

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

  return (
      <div>
      <ColorPicker setColor = {setSelectedColor} />
    <Card
      title={
        <div className="drag-handle " onDoubleClick={handleDoubleClick}>
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
        backgroundColor: selectedColor
      }}
    >
      <div>
        <ControlModuleSelectMenu
          configId={configId}
          setControlModuleType={setControlModuleType}
          controlModuleType={controlModuleType}
        ></ControlModuleSelectMenu>
        <p style={{
          color: "white",
          mixBlendMode: "difference"}}>Control Module</p>
        <Handle
          type="target"
          position={Position.Top}
          isValidConnection={isValidConnection}
        />
      </div>
    </Card>
      </div>
  );
}
export default ControlModuleNode;
