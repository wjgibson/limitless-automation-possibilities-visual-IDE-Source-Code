import {
  BarsOutlined,
  BgColorsOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import {
  Button, Divider, Dropdown, Input, Space,
} from 'antd';
import React, { useState } from 'react';
import './elements.css';

export default function DropDownMenu(props) {
  const [state, setState] = useState({ data: '' });

  const [nodeColorPreview, setNodeColorPreview] = useState();
  const [nodeLayer, setNodeLayerPreview] = useState();

  function changeState() {
    setState({ data: '' });
  }

  const [changeColorVis, setChangeColorVis] = useState('hidden');
  const [changeLayerVis, setLayerColorVis] = useState('visible');
  let dropMenuChoice = '';

  const [open, setOpen] = useState(false);
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  const setNodeColor = () => {
    props.setColor(nodeColorPreview);
  };

  const setNodeLayer = () => {
    props.setSeqLayer(nodeLayer);
  };

  const handleMenuClick = (e) => {
    if (e.key == 2) {
      setChangeColorVis('hidden');
      setLayerColorVis('visible');
      dropMenuChoice = '2';
    }
    if (e.key == 1) {
      setChangeColorVis('visible');
      setLayerColorVis('hidden');
      dropMenuChoice = '1';
    }
  };

  const items = [
    {
      label: 'Change Color',
      key: '1',
      icon: <BgColorsOutlined />,
    },
    {
      label: 'Change Sequence Layer',
      key: '2',
      icon: <DatabaseOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
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
            <Input
              type="number"
              id="dropDownMenuInputSetSeqLayer"
              style={{ visibility: changeLayerVis }}
              onChange={(e) => setNodeLayerPreview(e.target.value)}
            />
            <Button
              id="dropDownMenuButtonSetSeqLayer"
              type="primary"
              onClick={setNodeLayer}
              style={{ visibility: changeLayerVis }}
            >
              Enter
            </Button>

            <Input
              type="color"
              id="dropDownMenuInputSetColor"
              style={{ visibility: changeColorVis }}
              onChange={(e) => {
                setNodeColorPreview(e.target.value);
              }}
            />
            <Button
              id="dropDownMenuButtonSetColor"
              type="primary"
              style={{ visibility: changeColorVis }}
              onClick={setNodeColor}
            >
              Enter
            </Button>
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
