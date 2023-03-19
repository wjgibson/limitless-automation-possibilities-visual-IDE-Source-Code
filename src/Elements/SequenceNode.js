import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect, useCallback } from "react";
import { Card, message, Input } from "antd";
import "../Elements/elements.css";
import Validator from "../utilities/Validator";
import SeqTypeSelectMenu from "./SeqTypeSelectMenu.js";
import ColorPicker from "./ColorPicker";
import { Modal, Tooltip } from "antd";
import { BuildOutlined } from "@ant-design/icons";
import StepsModal from "./stepsModal";

const text = `
This is a user defined description for this node
`;

function SequenceNode({ data }) {
  const reactFlowInstance = useReactFlow();

  const [messageApi, contextHolder] = message.useMessage();
  const [color, setColor] = useState(data.color);
  const [seqType, setSeqType] = useState(data.type);
  const [configId, setConfigId] = useState(data.configId);
  const [invalidFlag, setInvalidFlag] = useState(false);

  const [cardTitle, setCardTitle] = useState(
    data.name ? data.name : "Sequence"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageDisplayed, setMessageDisplayed] = useState(false);

  function openSteps() {
    setIsModalOpen(true);
    console.log(isModalOpen);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function openSteps() {
    setIsModalOpen(true);
  }

  useEffect(() => {
    data.type = seqType;
    console.log(seqType);
  }, [seqType]);

  useEffect(() => {
    data.color = color;
  }, [color]);

  useEffect(() => {
    data.configId = configId;
  }, [configId]);

  useEffect(() => {
    data.name = newTitle;
  }, [newTitle]);

  useEffect(() => {
    if (invalidFlag) {
      invalidConnectionMessage();
      setInvalidFlag((flag) => !flag);
    }
  }, [invalidFlag]);

  const invalidConnectionMessage = useCallback(() => {
    if (invalidFlag && !messageDisplayed) {
      setMessageDisplayed(true);
      messageApi.open({
        type: "error",
        content: "This connection is invalid!",
      });
      setTimeout(() => {
        setMessageDisplayed(false);
      }, 5000); // Pause of 5 seconds between messages
    }
  }, [invalidFlag, messageDisplayed]);

  function isValidConnection(connection) {
    let connectionValidity = Validator(reactFlowInstance, connection);

    if (!connectionValidity && !invalidFlag) {
      setInvalidFlag(true);
    }
    return connectionValidity;
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
    <>
      {contextHolder}
      <StepsModal
        ismodalopen={isModalOpen}
        setmodalopen={setIsModalOpen}
        nodeName={configId}
      />
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
                autoSize={true}
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
                <Tooltip placement="bottom" title={"Steps"}>
                  <a
                    style={{
                      position: "absolute",
                      right: "10px",
                      color: "white",
                    }}
                    onClick={openSteps}
                  >
                    <BuildOutlined style={{ fontSize: "24px" }} />
                  </a>
                </Tooltip>
              </h3>
            )}
          </div>
        }
        bordered={false}
        style={{
          backgroundColor: color,
          mixBlendMode: "difference",
          paddingRight: 20,
        }}
      >
        <div>
          <div>
            <div>
              <SeqTypeSelectMenu
                configId={configId}
                setSeqType={setSeqType}
                seqType={seqType}
              ></SeqTypeSelectMenu>
            </div>
          </div>
          <p
            style={{
              color: "white",
              mixBlendMode: "difference",
            }}
          >
            Sequence
          </p>
          <Handle
            type="target"
            position={Position.Top}
            isValidConnection={isValidConnection}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            isValidConnection={isValidConnection}
          />
        </div>
        <ColorPicker initialColor={color} setColor={setColor} />
      </Card>
    </>
  );
}

export default SequenceNode;
