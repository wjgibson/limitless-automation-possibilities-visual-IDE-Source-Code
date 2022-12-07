import {
  BuildOutlined,
  DownloadOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";

import APIHelper from "../resources/APIHelper";

import { Menu } from "antd";
import { useReactFlow } from "reactflow";

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

  const reactFlowInstance = useReactFlow();

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

  async function getConfigurations() {
    // console.log(await APIHelper.doGet("getAllConfigs"));

    setConfigList(await APIHelper.doGet("getAllConfigs"));
  }

  async function checkForConfigSelection(instance, selected) {
    if (selected.key === "1") {
      saveConfiguration(instance, selected);
    } else if (selected.key === "2") {
      restoreConfiguration(selected);
    } else if (selected.key === "5") {
      insertNewConfiguration(instance);
    } else {
      console.log(`selected key: ${selected.key}`);
      setOpenConfig(selected.key);
    }
  }

  async function saveConfiguration(instance) {
    let json = {
      jsonData: instance,
      cid: openConfig,
    };
    let body = JSON.stringify(json);
    console.log(json);
    APIHelper.makePost("updateConfig", body);
  }

  async function restoreConfiguration(selected) {
    await APIHelper.doGet("getConfigJSON", selected.cid);
  }

  async function insertNewConfiguration(instance) {
    let name = prompt("Enter the new configuration name");
    let json = {
      jsonData: instance,
      name: name,
    };
    let body = JSON.stringify(json);
    await APIHelper.makePost("insertNewConfig", body).then(() => {
      getConfigurations();
    });
  }

  const onClick = (e) => {
    checkForConfigSelection(reactFlowInstance, e);
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
