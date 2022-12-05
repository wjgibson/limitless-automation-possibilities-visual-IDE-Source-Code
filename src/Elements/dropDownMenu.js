import React, {  useState } from "react";
import { UserOutlined, BarsOutlined} from '@ant-design/icons';
import { Button, Dropdown, message, Space, Divider, Input } from 'antd';
import "./elements.css"


export default function DropDownMenu({setSeqLayer}){

  const [state, setState] = useState({data:""})

  function changeState(){
    setState({data:""})
  }

let dropMenuChoice =""  

    const [open, setOpen] = useState(false)
const handleOpenChange = (flag) => {
  setOpen(flag);
};
function dropDownMenuButtonClick(){
if(dropMenuChoice =="2"){

  
}
}

const handleMenuClick = (e) => {
  if (e.key == 2){
    document.getElementById("dropDownMenuButton").disabled =false;
    document.getElementById("dropDownMenuInput").disabled = false;
    document.getElementById("dropDownMenuInput").type = "number";
    dropMenuChoice="2"
    
  }
  if (e.key == 1){
    document.getElementById("dropDownMenuButton").disabled =false;
    document.getElementById("dropDownMenuInput").disabled = false;
    document.getElementById("dropDownMenuInput").type = "color";
    dropMenuChoice="1"
  }
};

const items = [
  {
    label: 'Change Color',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Change Sequence Layer',
    key: '2',
    icon: <UserOutlined />,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
return(
    <Dropdown
    menu={menuProps}
    placement="bottomRight"
    arrow
    onOpenChange={handleOpenChange}
      open={open}
    dropdownRender={(menu) => (
      <div className="dropdown-content">
        {menu}
        <Divider
          style={{
            margin: 0,
          }}
        />
        <Space
          style={{
            padding: 8,
          }}
        >
          <Input  type="number" id="dropDownMenuInput"   style={{}}></Input>
          <Button id="dropDownMenuButton" type="primary" onClick={() => setSeqLayer(document.getElementById("dropDownMenuInput").value)} style={{}}>Enter</Button>
        </Space>
      </div>
    )}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
      <BarsOutlined />
      </Space>
    </a>
  </Dropdown>
    );
    
}