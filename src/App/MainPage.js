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
import { CloseOutlined } from "@ant-design/icons";

import "./index.css";

import APIHelper from "../utilities/APIHelper";

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
  const [selectedConfig, setSelectedConfig] = useState("");
  const [save, setSave] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {}, [openConfigs]);

  const removeOpenConfigs = (config) => {
    let newConfigs = openConfigs;
    let index = newConfigs.indexOf(config);
    if (index > -1) {
      newConfigs.splice(index, 1);
    }
    setOpenConfigs([...newConfigs]);
  };

  const openNewConfig = (config) => {
    if (
      config !== undefined &&
      config !== "" &&
      openConfigs.filter((openConfig) => openConfig.id == config.id).length == 0
    ) {
      setOpenConfigs((cl) => [...cl, config]);
    }
  };

  const onSave = () => {
    setSave(true);
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
      // await APIHelper.makePost("insertNewConfig", body);
      await APIHelper.makePost("createNewConfig", body);
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
        style={{
          overflow: "auto",
          height: "100vh",
        }}
      >
        <div className="logo" />
        <CustomMenu
          selectedConfig={selectedConfig}
          save={onSave}
          restore={onRestore}
          insert={onInsert}
          addToOpen={openNewConfig}
        ></CustomMenu>
      </Sider>
      <Layout className="site-layout">
        <Content>
          <Tabs
            onTabClick={(e) => setSelectedConfig(e)}
            style={{ height: "100vh" }}
            type="card"
            tabBarStyle={{ backgroundColor: "#001529" }}
            items={openConfigs?.map((config) => {
              return {
                label: (
                  <div style={{ color: "white", mixBlendMode: "difference" }}>
                    <span>{`${config.name}`}</span>
                    <button
                      style={{ border: "0px", backgroundColor: "transparent" }}
                      onClick={() => removeOpenConfigs(config)}
                    >
                      <CloseOutlined
                        style={{
                          color: "white",
                          mixBlendMode: "difference",
                          float: "left",
                        }}
                      />
                    </button>
                  </div>
                ),
                key: config.id,
                children: (
                  <FlowEditor
                    configId={config.id}
                    save={save}
                    setSave={setSave}
                    selectedConfig={selectedConfig}
                    background={<Background color="#00284f" variant="dots" />}
                  />
                ),
              };
            })}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPage;
