import {
  BuildOutlined,
  DownloadOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";

import APIHelper from "../resources/APIHelper";

import { Menu } from "antd";

function getItem(label, key, icon, children, handler) {
  return {
    key,
    icon,
    children,
    label,
    handler,
  };
}

const CustomMenu = (props) => {
  const [configList, setConfigList] = useState([]);
  const [items, setItems] = useState([]);
  const [openConfig, setOpenConfig] = useState("");
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // let nodes = props.nodesArray;
  // let edges = props.edgesArray;

  useEffect(() => {
    getConfigurations();
  }, []);

  useEffect(() => {
    setConfigList(configList);
  }, []);

  useEffect(() => {
    console.log(`loaded: ${openConfig}`);
  }, [openConfig]);

  useEffect(() => {
    let configs = configList.map((config) => getItem(config.name, config.cid));
    console.log(configs);
    setItems([
      getItem("Save Configuration", "1", <SaveOutlined />),
      getItem("Pull Configuration", "2", <DownloadOutlined />),
      getItem("Configurations", "sub1", <BuildOutlined />, [
        ...configs,
        getItem("New", "5", <PlusOutlined />),
      ]),
    ]);
  }, [configList]);

  useEffect(() => {
    setReactFlowInstance(props.instance);
  }, [props.instance]);

  async function getConfigurations() {
    // console.log(await APIHelper.doGet("getAllConfigs"));

    setConfigList(await APIHelper.doGet("getAllConfigs"));
  }

  async function checkForConfigSelection(selected) {
    if (selected.key === "1") {
      saveConfiguration(reactFlowInstance, openConfig);
    } else if (selected.key === "2") {
      restoreConfiguration(selected);
    } else if (selected.key === "5") {
      insertNewConfiguration(reactFlowInstance);
    } else {
      console.log(`selected key: ${selected.key}`);
      setOpenConfig(selected.key);
    }
  }

  async function saveConfiguration() {
    props.save(openConfig);
  }

  async function restoreConfiguration(selected) {
    props.restore(openConfig);
  }

  async function insertNewConfiguration() {
    let name = prompt("Enter the new configuration name");
    let json = {
      jsonData: reactFlowInstance,
      name: name,
    };
    let body = JSON.stringify(json);
    await APIHelper.makePost("insertNewConfig", body).then(() => {
      getConfigurations();
    });
  }

  const onClick = (e) => {
    console.log(`selected: ${e}`);
    checkForConfigSelection(e);
  };
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
      onClick={onClick}
    />
  );
};

export default CustomMenu;
