import {
  BuildOutlined,
  DownloadOutlined,
  PlusOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";

import APIHelper from "../resources/APIHelper";

import { Menu } from "antd";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const CustomMenu = (props) => {
  const [configList, setConfigList] = useState([]);
  const [items, setItems] = useState([]);
  const [openConfig, setOpenConfig] = useState("");
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

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
    let configs = configList.map((config) =>
      getItem(config.name, config.cid, <DeleteOutlined />)
    );
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

  async function restoreConfiguration() {
    props.restore(openConfig);
  }

  async function insertNewConfiguration() {
    props.insert(getConfigurations);
  }

  const onClick = (e) => {
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
