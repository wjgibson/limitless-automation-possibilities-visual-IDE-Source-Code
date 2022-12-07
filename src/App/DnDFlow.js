import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "../Elements/Sidebar";
import SRControls from "../Elements/SRControls";
import nodeTypes from "../resources/nodeTypes";

import "./index.css";

import APIHelper from "../resources/APIHelper";

import { Breadcrumb, Layout, Menu } from "antd";
import items from "../Elements/Menu";
const { Header, Content, Footer, Sider } = Layout;

let flowKey = "";

let id = 0;
let seqType = 2;
const getId = () => `sequence_${id++}`;

function setFlowKey(name) {
  flowKey = name;
}

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [collapsed, setCollapsed] = useState(false);

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      let name = prompt("Configuration Name");
      setFlowKey(name);
      const flow = reactFlowInstance.toObject();
      APIHelper.makePost("updateConfiguration");
      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log(JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      let restoreName = prompt("Configuration to restore");
      setFlowKey(restoreName);
      const flow = APIHelper.doGet(`getConfigJSON:${flowKey}`);

      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }
    };

    restoreFlow();
  }, [setNodes]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: "step", animated: true }, eds)
      ),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
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
        data: { label: `${type} node | id: ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" />
        <Content>
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
                    deleteKeyCode={["Delete", "Backspace"]}
                    fitView
                  >
                    <Background color="#00284f" variant="dots" />
                    <Controls />
                  </ReactFlow>
                </div>
                <Sidebar />
              </ReactFlowProvider>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DnDFlow;
