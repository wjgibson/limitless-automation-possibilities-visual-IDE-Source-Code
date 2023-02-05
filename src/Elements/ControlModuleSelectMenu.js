import { Select } from "antd";
import APIHelper from "../utilities/APIHelper";
import React, { useState, useEffect } from "react";

export default function SeqTypeSelectMenu(props) {
  const [controlModuleTypes, setControlModuleTypes] = useState([]);
  const [nodeColorPreview, setNodeColorPreview] = useState();

  useEffect(() => {
    getAllControlModuleTypes();
    console.log(controlModuleTypes);
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
  const onSearch = (value) => {
    console.log("search:", value);
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
      <Select
        showSearch
        placeholder="Select a control module type"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={controlModuleTypes.map((cmType) => ({
          value: cmType.typeuuid,
          label: cmType.name,
        }))}
      />
    </>
  );
}
