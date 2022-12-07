import { React, useState, useEffect } from "react";
import APIHelper from "../resources/APIHelper";

export default (props) => {
  const [configList, setConfigList] = useState([]);

  useEffect(() => {
    getConfigurations();
  }, [configList]);
  useEffect(() => {
    setConfigList(configList);
  });

  async function getConfigurations() {
    setConfigList(await APIHelper.doGet("getAllConfigs"));
  }

  return (
    <div className="save__controls">
      <button aria-label="save" onClick={props.save}>
        save
      </button>
      <button aria-label="restore" onClick={props.restore}>
        restore
      </button>
      <div>
        {configList.map((s) => (
          <div key={s.cid}>{s.name}</div>
        ))}
      </div>
    </div>
  );
};
