import { Handle, Position, useReactFlow } from "reactflow";
import { React, useState, useEffect } from "react";
import { Card } from "antd";
import "../Elements/elements.css";
import DownDownMenu from "./dropDownMenu.js";
import Validator from "../resources/Validator";

const text = `
This is a user defined description for this node
`;

function SequenceNode({ data }) {
  const reactFlowInstance = useReactFlow();
  const [connection, setConnection] = useState();
  const [checkIfValidConnection, setCheckIfValidConnection] = useState(false);
  const [invalidConnection, setInvalidConnection] = useState(false);
  const [color, setColor] = useState(data.color);
  const [seqType, setSeqType] = useState(data.seqType);

  useEffect(() => {
    data.seqType = seqType;
    setCheckIfValidConnection(!checkIfValidConnection)
    console.log("Change Seq")
    data.edgeCheck()
  }, [seqType]);

  useEffect(() => {
    data.color = color;
  }, [color]);

  useEffect(() =>{
    data.connection = connection;
  }, [connection])
  useEffect(() =>{
    data.invalidConnection = invalidConnection;
  },[invalidConnection])
  useEffect(()=>{
    if(connection != null){
    if(Validator(reactFlowInstance, connection)){
      setInvalidConnection(false);
      
    }
    else{
      setInvalidConnection(true)
    }
  }},[checkIfValidConnection])




  function isValidConnection(connection) {
    setConnection(connection)
    return Validator(reactFlowInstance, connection);
  }

  data.opcid = 45;

  return (
    <Card
      title={
        <div>
          <h3
            style={{
              display: "inline",
              color: "white",
              mixBlendMode: "difference",
            }}
          >
            Sequence
          </h3>
          <DownDownMenu
            setSeqLayer={setSeqType}
            setColor={setColor}
            style={{ display: "inline", float: "right" }}
          ></DownDownMenu>
        </div>
      }
      bordered={false}
      style={{
        width: 300,
        backgroundColor: color,
        mixBlendMode: "difference",
      }}
    >
      <div className="dynamicTextColor">
        <div>
          <div>Type: {seqType}</div>
        </div>
        <p>Sequence</p>
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
    </Card>
  );
}

export default SequenceNode;
