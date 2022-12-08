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

  let nodes = props.nodesArray;
  let edges = props.edgesArray;

  let data = formatJSON(edges, nodes);

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

  function formatJSON(nodes, edges) {
    let json = {
      nodes: nodes,
      edges: edges,
    };
    return json;
  }

  async function checkForConfigSelection(selected) {
    if (selected.key === "1") {
      saveConfiguration(data, openConfig);
    } else if (selected.key === "2") {
      restoreConfiguration(selected);
    } else if (selected.key === "5") {
      insertNewConfiguration(data);
    } else {
      console.log(`selected key: ${selected.key}`);
      setOpenConfig(selected.key);
    }
  }

  async function saveConfiguration() {
    let json = {
      jsonData: data,
      cid: openConfig,
    };
    let body = JSON.stringify(json);
    console.log(`updateConfig json data: ${JSON.stringify(json)}`);
    APIHelper.makePost("updateConfig", body);
  }

  async function restoreConfiguration(selected) {
    await APIHelper.doGet("getConfigJSON", selected.cid);
  }

  async function insertNewConfiguration() {
    let name = prompt("Enter the new configuration name");
    let json = {
      jsonData: data,
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
