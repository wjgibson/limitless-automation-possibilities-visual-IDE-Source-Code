import { Select } from "antd";
import APIHelper from "../utilities/APIHelper";
import React, { useState, useEffect } from "react";

export default function SeqTypeSelectMenu(props) {
  const [controlModuleTypes, setControlModuleTypes] = useState([]);
  const [nodeColorPreview, setNodeColorPreview] = useState();

  useEffect(() => {
    getAllControlModuleTypes();
  }, []);

  const setNodeColor = () => {
    props.setColor(nodeColorPreview);
  };

  const setNodeType = (type) => {
    props.setControlModuleType(type);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setNodeType(value);
  };

  const getAllControlModuleTypes = () => {
    const retrieveControlModuleTypes = async () => {
      const response = await APIHelper.doGet(
        `getAllControlModuleTypes${props.configId}`
      );
      setControlModuleTypes(response);
    };
    retrieveControlModuleTypes();
  };
  return (
    <>
      <p style={{ margin: 0, fontSize: "10px" }}>Control Module Type</p>
      <Select
        placeholder="Select a control module type"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        value={props.controlModuleType}
        style={{ width: "100%" }}
        options={controlModuleTypes.map((cmType) => ({
          value: cmType.name,
          label: cmType.name,
        }))}
      />
    </>
  );
}
