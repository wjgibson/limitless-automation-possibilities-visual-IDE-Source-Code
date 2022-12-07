import {
  DesktopOutlined,
  FileOutlined,
  BuildOutlined,
  TeamOutlined,
  UserOutlined,
  SaveOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import React, { useState, useRef, useCallback } from "react";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Save Configuration", "1", <SaveOutlined />),
  getItem("Pull Configuration", "2", <DownloadOutlined />),
  getItem("Configurations", "sub1", <BuildOutlined />, [
    getItem("Configuration 1", "3"),
    getItem("Configuration 2", "4"),
    getItem("New configuration", "5", <PlusOutlined />),
  ]),
];

export default items;
