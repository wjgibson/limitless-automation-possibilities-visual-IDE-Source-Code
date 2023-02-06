import { Select, Input, Button } from "antd";
import APIHelper from "../utilities/APIHelper";
import React, { useState, useEffect } from "react";

export default function SeqTypeSelectMenu(props) {
  const [seqTypes, setSeqTypes] = useState([]);
  const [nodeColorPreview, setNodeColorPreview] = useState();

  useEffect(() => {
    getAllSeqTypes();
  }, []);

  useEffect(() => {
    console.log(seqTypes);
  }, [seqTypes]);

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
      <p style={{ margin: 0, fontSize: "10px" }}>Sequence Type</p>
      <Select
        placeholder="Select a sequence type"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        value={props.seqType}
        style={{ width: "100%" }}
        options={seqTypes.map((seqType) => ({
          value: seqType.typeuuid + "|" + seqType.plcid,
          label: seqType.name,
        }))}
      />
    </>
  );
}
