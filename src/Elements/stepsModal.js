import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button, Modal } from 'antd'
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    applyEdgeChanges,
    applyNodeChanges
  } from "reactflow";
import 'reactflow/dist/style.css';

import resetStepNode from './ResetStepNode.js';
import nextStepNode from './NextStepNode.js';





let curID =3;
const initialNodes = [];
const initialEdges = [];
const nodeTypes = {ResetStep: resetStepNode, NextStep:nextStepNode};

const stepsModal = (props) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      []
    );
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      []
    );

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    let nodeName = props.nodeName;


    const handleOk = () => {
      setIsModalOpen(false);
      props.setmodalopen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      props.setmodalopen(false);
    };
    useEffect(()=>{
        if(props.ismodalopen == true){
            setIsModalOpen(true);
        }
        
    },[props.ismodalopen])
  
    function addResetStep(){
      setNodes(nodes.concat({id: curID.toString(), type:'ResetStep',
        data: { label: 'Reset' },
        position: { x: 100, y: 100 },}));
        curID += 1;
    }

    function addNextStep(){
      setNodes(nodes.concat({id: curID.toString(), type:'NextStep',
        data: { label: 'Next' },
        position: { x: 100, y: 100 },}));
        curID += 1;
    }


  return (
    <Modal title={"Steps for "+nodeName} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1250}>
    <div className="site-layout-background">
      <Button onClick={addResetStep}>Reset Step</Button>
      <Button onClick={addNextStep}>Next Step</Button>
      <div aria-label="rfProvider" className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow nodes={nodes}
          onNodesChange={onNodesChange}
         edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          deleteKeyCode={["Delete", "Backspace"]}
          fitView
          >
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  </Modal>
  )
}

export default stepsModal
