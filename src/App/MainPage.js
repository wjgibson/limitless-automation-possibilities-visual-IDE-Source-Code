import React, { useState, useRef, useCallback, useEffect } from "react";
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
import nodeTypes from "../resources/nodeTypes";

import { v4 as uuidv4 } from "uuid";

import "./index.css";

import APIHelper from "../resources/APIHelper";

import { Layout, Tabs, Flex } from "antd";
import CustomMenu from "../Elements/Menu";
import FlowEditor from "../Elements/FlowEditor";

const { Header, Content, Footer, Sider } = Layout;

let flowKey = "";

function setFlowKey(name) {
  flowKey = name;
}

const MainPage = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [openConfigs, setOpenConfigs] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    console.log("open configs set", openConfigs);
  }, [openConfigs]);

  const removeOpenConfigs = (config) => {
    let newConfigs = openConfigs;
    let index = newConfigs.indexOf(config);
    if (index > -1) {
      newConfigs.splice(index, 1);
    }
    console.log(newConfigs);
    setOpenConfigs([...newConfigs]);
  };

  const openNewConfig = (config) => {
    console.log();
    if (
      config !== undefined &&
      config !== "" &&
      openConfigs.filter((openConfig) => openConfig.id == config.id).length == 0
    ) {
      setOpenConfigs((cl) => [...cl, config]);
    }
  };

  const onSave = (cid) => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      let json = {
        jsonData: flow,
        cid: cid,
      };
      let body = JSON.stringify(json);
      console.log(`updateConfig json data: ${JSON.stringify(json)}`);
      APIHelper.makePost("updateConfig", body);
    }
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

  const onInsert = (reload) => {
    const insertNewConfig = async () => {
      let name = prompt("Enter the new configuration name");
      let json = {
        jsonData: reactFlowInstance,
        name: name,
      };
      let body = JSON.stringify(json);
      await APIHelper.makePost("insertNewConfig", body);
    };
    insertNewConfig().then(() => {
      reload();
    });
  };

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <CustomMenu
          save={onSave}
          restore={onRestore}
          insert={onInsert}
          addToOpen={openNewConfig}
        ></CustomMenu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" />
        <Content>
          <Tabs
            type="card"
            items={openConfigs?.map((config) => {
              return {
                label: (
                  <div>
                    <span>{`${config.name}`}</span>
                    <button onClick={() => removeOpenConfigs(config)}>x</button>
                  </div>
                ),
                key: config.id,
                children: <FlowEditor configid={config.id} />,
              };
            })}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPage;
