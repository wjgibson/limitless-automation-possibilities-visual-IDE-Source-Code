import React, { useState, useRef, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background } from "reactflow";
import "reactflow/dist/style.css";
import { CloseOutlined, ExclamationOutlined } from "@ant-design/icons";

import "./index.css";

import APIHelper from "../utilities/APIHelper";

import { Layout, Tabs } from "antd";
import CustomMenu from "../Elements/Menu";
import FlowEditor from "../Elements/FlowEditor";

const { Content, Sider } = Layout;

const MainPage = () => {
  const [showExclamtion, setShowExclamation] = useState(false);
  const exclamtionRef = useRef();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [openConfigs, setOpenConfigs] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState("");
  const [save, setSave] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleConfigChange = () => {
    exclamtionRef.current.style.visibilty = true;
  };
  useEffect(() => {
    console.log("open configs set", openConfigs);
  }, [openConfigs]);

  const removeOpenConfigs = (config) => {
    let confirmation = window.confirm(
      "Closing this tab without saving will lose unsaved progress. Are you sure?"
    );
    let newConfigs = openConfigs;
    let index = newConfigs.indexOf(config);
    if (index > -1) {
      newConfigs.splice(index, 1);
    }
    if (confirmation) {
      setOpenConfigs([...newConfigs]);
    }
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

  const onInsert = (reload) => {
    const insertNewConfig = async () => {
      let name = prompt("Enter the new configuration name");
      let json = {
        jsonData: reactFlowInstance,
        name: name,
      };
      let body = JSON.stringify(json);
      await APIHelper.makePost("createNewConfig", body);
    };
    insertNewConfig().then(() => {
      reload();
    });
  };

  const onDelete = (cid, reload) => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this configuration? Unsaved work will be lost"
    );
    if (confirmation) {
      const deleteConfig = async () => {
        let json = {
          cid: cid,
        };
        let body = JSON.stringify(json);
        await APIHelper.makePost(`deleteConfig`, body);
      };
      deleteConfig().then(() => {
        removeConfigFromTabArray();
        reload();
      });
    }
  };

  function removeConfigFromTabArray() {
    let tabs = openConfigs;
    tabs.forEach((openConfig, index) => {
      if (openConfig.id == selectedConfig) {
        tabs.splice(index, 1);
      }
    });
    setOpenConfigs([...tabs]);
  }

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ overflow: collapsed ? 'hidden' : 'scroll', height: '97vh'}}>
        <div className="logo" />
        <CustomMenu
          selectedConfig={selectedConfig}
          setSelectedConfig={setSelectedConfig}
          save={onSave}
          insert={onInsert}
          delete={onDelete}
          addToOpen={openNewConfig}
        ></CustomMenu>
      </div>
      </Sider>
      <Layout className="site-layout">
        <Content>
          <Tabs
            onTabClick={(e) => setSelectedConfig(e)}
            style={{ height: "100vh" }}
            type="card"
            activeKey={selectedConfig}
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
                    {showExclamtion ? <ExclamationOutlined /> : null}
                  </div>
                ),
                key: config.id,
                children: (
                  <FlowEditor
                    configId={config.id}
                    save={save}
                    setSave={setSave}
                    setShowExclamation={setShowExclamation}
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
