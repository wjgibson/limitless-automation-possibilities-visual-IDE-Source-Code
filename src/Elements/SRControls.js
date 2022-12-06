import { React, useState, useEffect } from "react";
import APIHelper from "../resources/APIHelper";

export default (props) => {
  const [configList, setconfigList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getConfigurations().then((items) => {
      if (mounted) {
        setconfigList(items);
      }
    });
    return () => (mounted = false);
  }, [configList]);

  async function getConfigurations() {
    console.log(APIHelper.doGet("getAllConfigs"));
    APIHelper.doGet("getAllConfigs");
    // setconfigList(APIHelper.doGet("getAllConfigs"));
  }

  return (
    <div className="save__controls">
      <button aria-label="save" onClick={props.save}>
        save
      </button>
      <button aria-label="restore" onClick={props.restore}>
        restore
      </button>
      <ul>
        {configList.Map((item) => (
          <li key={item.item}>{item.item}</li>
        ))}
      </ul>
    </div>
  );
};
