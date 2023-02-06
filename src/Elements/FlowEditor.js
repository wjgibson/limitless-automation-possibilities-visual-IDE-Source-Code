import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import nodeTypes from '../resources/nodeTypes';

import '../App/index.css';

import { v4 as uuidv4 } from 'uuid';

import APIHelper from '../resources/APIHelper';

const getId = () => `sequence_${uuidv4()}`;

function FlowEditor(props) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);


  useEffect(() => {
    onRestore(props.configId);
  }, []);

  const trackEdgeConnection =() => {
    let edges2 = edges
    let nodes2 = nodes
    if(nodes2 !=nodes2.length!= 0){
      for(var i = 0; i<nodes2.length; i++){

      if(nodes2[i].data.invalidConnection == true){
        let nodeTarget = nodes2[i].data.connection
        for(var j = 0; j < edges2.length; j++){
          if(nodeTarget.source == edges2[j].source){        
            edges2[j].style = {stroke:'red'}
          }
        }
      }
      if(nodes2[i].data.invalidConnection == false){
        let nodeTarget = nodes2[i].data.connection
        if(nodeTarget != undefined){
        for(var j = 0; j < edges2.length; j++){
          if(nodeTarget.target == edges2[j].target){        
            edges2[j].style = {stroke:'black'}
            }
        }
      }
      }
      }
        setEdges([...edges2]) 
        setNodes([...nodes2])
    }
  }
  useEffect(()=>{
    trackEdgeConnection()
  },[nodes])

  useEffect(() => {
    if (props.save) {
      onSave();
    }
  }, [props.save]);

  const onConnect = useCallback(

    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: "step", animated: true, style:{stroke:'black'} }, eds)
    ),
    []

  );
  useEffect(()=>{
    console.log(reactFlowInstance)
  }, [reactFlowInstance])

  const onSave = () => {
    if (props.selectedConfig == props.configId) {
      if (reactFlowInstance) {
        const flow = reactFlowInstance.toObject();
        const json = {
          jsonData: flow,
          cid: props.configId,
        };
        const body = JSON.stringify(json);
        console.log(`updateConfig json data: ${JSON.stringify(json)}`);
        APIHelper.makePost('updateConfig', body);
      }
    }
    props.setSave(false);
  };

  const onRestore = (cid) => {
    const restoreFlow = async () => {
      const response = await APIHelper.doGet(`getConfigJSON${cid}`);
      const flow = response[0].json;

      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }
    };
    restoreFlow();
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: `${getId()}`,
        type,
        position,
        data: { label: `${type} node`, edgeCheck: trackEdgeConnection },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  return (
    <div className="site-layout-background">
      <div aria-label="rfProvider" className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              nodeTypes={nodeTypes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              deleteKeyCode={['Delete', 'Backspace']}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        <Sidebar />
      </div>
    </div>
  );
}

export default FlowEditor;
