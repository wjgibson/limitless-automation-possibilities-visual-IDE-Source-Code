import {
  BuildOutlined,
  SaveOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import React, { useState, useEffect } from "react";
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
  const reactFlowInstance = props.instance;

  useEffect(() => {
    getConfigurations();
  }, []);

  useEffect(() => {
    setConfigList(configList);
  }, []);

  async function getConfigurations() {
    // console.log(await APIHelper.doGet("getAllConfigs"));
    setConfigList(await APIHelper.doGet("getAllConfigs"));
  }

  function displayConfigurations() {
    return configList.forEach(function callBack(value, index) {
      getItem(value.name, index);
    });
  }

  async function checkForSelection() {}

  //could write these functions here or maybe pass them in as functions to an onClick Handler.
  //i.e {props.save} and {props.restore} would be given to the save and restore items respectfully
  //We would have to figure out how to tell which configuration is selected, though. Eef.
  async function saveConfiguration() {}

  async function restoreConfiguration() {}

  const items = [
    getItem("Save Configuration", "1", <SaveOutlined />),
    getItem("Pull Configuration", "2", <DownloadOutlined />),
    getItem("Configurations", "sub1", <BuildOutlined />, [
      displayConfigurations(),
      getItem("New", "5", <PlusOutlined />),
    ]),
  ];

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
    />
  );
};

export default CustomMenu;
