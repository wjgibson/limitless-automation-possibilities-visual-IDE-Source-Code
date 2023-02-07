// import all types and create components in a loop
import { React, useState } from 'react';
import { Card, Tooltip } from 'antd';
import { SettingOutlined, NodeIndexOutlined } from '@ant-design/icons';

export default function () {
  const onDragStart = (event, nodeType) => {
    onClose();
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Card
      title="Nodes"
      placement="right"
      onClose={onClose}
      open={open}
      style={{
        textAlign: 'center',
      }}
      width="200"
    >
      <Tooltip
        title="Sequence Node"
        placement="left"
        color="#000c17"
        key="sequence"
      >
        <Card
          style={{ height: 'auto' }}
          aria-label="sequence"
          className="dndnode"
          onDragStart={(event) => onDragStart(event, 'sequence')}
          draggable
        >
          <NodeIndexOutlined style={{ fontSize: '30px' }} />
        </Card>
      </Tooltip>
      <Tooltip
        title="Control Modules Node"
        placement="left"
        color="#000c17"
        key="controlModule"
      >
        <Card
          style={{ height: 'auto' }}
          aria-label="controlModule"
          className="dndnode"
          onDragStart={(event) => onDragStart(event, 'controlModule')}
          draggable
        >
          <SettingOutlined style={{ fontSize: '30px' }} />
        </Card>
      </Tooltip>
    </Card>
  );
}
