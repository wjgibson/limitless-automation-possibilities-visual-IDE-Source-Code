import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import React, { useState, useRef, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background } from "reactflow";
import "reactflow/dist/style.css";
import { CloseOutlined, ExclamationOutlined } from "@ant-design/icons";

import { v4 as uuidv4 } from "uuid";
import Sidebar from "../Elements/Sidebar";
import nodeTypes from "../resources/nodeTypes";

import "./index.css";

import APIHelper from "../resources/APIHelper";

import { Layout, Tabs, Flex } from "antd";
import CustomMenu from "../Elements/Menu";
import FlowEditor from "../Elements/FlowEditor";
import { CloseOutlined } from "@ant-design/icons";

import APIHelper from "../utilities/APIHelper";

import { Layout, Tabs, Popconfirm } from "antd";
import CustomMenu from "../Elements/Menu";
import FlowEditor from "../Elements/FlowEditor";

let flowKey = "";

function setFlowKey(name) {
  flowKey = name;
}
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
  useEffect(() => {}, [openConfigs]);

  const removeOpenConfigs = (config) => {
    const newConfigs = openConfigs;
    const index = newConfigs.indexOf(config);
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
      const name = prompt("Enter the new configuration name");
      const json = {
        jsonData: reactFlowInstance,
        name,
      };
      const body = JSON.stringify(json);
      await APIHelper.makePost("insertNewConfig", body);
      let body = JSON.stringify(json);
      // await APIHelper.makePost("insertNewConfig", body);
      await APIHelper.makePost("createNewConfig", body);
    };
    insertNewConfig().then(() => {
      reload();
    });
  };

  const onDelete = (cid, reload) => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this configuration?"
    );
    if (confirmation) {
      const deleteConfig = async () => {
        let json = {
          cid: cid,
        };
        let body = JSON.stringify(json);
        APIHelper.makePost(`deleteConfig`, body);
      };
      deleteConfig().then(() => {
        reload();
      });
    }
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
          selectedConfig={selectedConfig}
          save={onSave}
          restore={onRestore}
          insert={onInsert}
          delete={onDelete}
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
