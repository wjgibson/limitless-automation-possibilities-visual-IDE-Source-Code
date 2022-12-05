import React, {  useState } from "react";
import { UserOutlined, BarsOutlined} from '@ant-design/icons';
import { Button, Dropdown, message, Space, Divider, Input } from 'antd';
import "./elements.css"


export default function DropDownMenu(props){

  const [state, setState] = useState({data:""})

  function changeState(){
    setState({data:""})
  }

let dropMenuChoice =""  

    const [open, setOpen] = useState(false)
const handleOpenChange = (flag) => {
  setOpen(flag);
};


const handleMenuClick = (e) => {
  if (e.key == 2){
    document.getElementById("dropDownMenuInputSetSeqLayer").style.visibility = "visible";
    document.getElementById("dropDownMenuButtonSetSeqLayer").style.visibility = "visible";
    document.getElementById("dropDownMenuInputSetColor").style.visibility = "hidden";
    document.getElementById("dropDownMenuButtonSetColor").style.visibility = "hidden";
    dropMenuChoice="2"
    
  }
  if (e.key == 1){

    document.getElementById("dropDownMenuInputSetColor").style.visibility = "visible";
    document.getElementById("dropDownMenuButtonSetColor").style.visibility = "visible";
    document.getElementById("dropDownMenuInputSetSeqLayer").style.visibility = "hidden";
    document.getElementById("dropDownMenuButtonSetSeqLayer").style.visibility = "hidden";
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
          <Input  type="number" id="dropDownMenuInputSetSeqLayer"   style={{visibility:"Visibilty"}}></Input>
          <Button id="dropDownMenuButtonSetSeqLayer" type="primary" onClick={() => props.setSeqLayer(document.getElementById("dropDownMenuInputSetSeqLayer").value)} style={{visibility:"Visibilty"}}>Enter</Button>

          <Input  type="color" id="dropDownMenuInputSetColor"   style={{visibility:"hidden"}}></Input>
          <Button id="dropDownMenuButtonSetColor" type="primary" onClick={()=> props.setColor(document.getElementById("dropDownMenuInputSetColor").value)} style={{visibility:"hidden"}}>Enter</Button>
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