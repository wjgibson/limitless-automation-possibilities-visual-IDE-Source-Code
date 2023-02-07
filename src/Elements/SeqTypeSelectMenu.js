import { Select, Input, Button } from "antd";
import APIHelper from "../utilities/APIHelper";
import React, { useState, useEffect } from "react";

export default function SeqTypeSelectMenu(props) {
  const [seqTypes, setSeqTypes] = useState([]);
  const [nodeColorPreview, setNodeColorPreview] = useState();

  useEffect(() => {
    getAllSeqTypes();
    console.log(seqTypes);
  }, []);

  const setNodeColor = () => {
    props.setColor(nodeColorPreview);
  };

  const setNodeType = (type) => {
    props.setSeqType(type);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setNodeType(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const getAllSeqTypes = () => {
    const retrieveSeqTypes = async () => {
      const response = await APIHelper.doGet(
        `getAllSequenceTypes${props.configId}`
      );
      setSeqTypes(response);
    };
    retrieveSeqTypes();
  };
  return (
    <>
      <Select
        showSearch
        placeholder="Select a sequence type"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={seqTypes.map((seqType) => ({
          value: seqType.typeuuid,
          label: seqType.name,
        }))}
      />
    </>
  );
}
