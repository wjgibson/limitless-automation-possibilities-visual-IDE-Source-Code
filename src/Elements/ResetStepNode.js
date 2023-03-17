import React from 'react'
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Card} from 'antd';


const handleStyle = { left: 10 };

const ResetStepNode = ({ data, isConnectable }) => {

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
      }, []);
    
  return (
    <Card
        title={
          <div className="drag-handle">
            <h3
              style={{
                display: "inline",
                color: "white",
                mixBlendMode: "difference",
              }}
            >
              Reset Step
            </h3>
          </div>
        }
        bordered={false}
        style={{
          width: 300,
          mixBlendMode: "difference",
        }}>
            <Handle
            type="target"
            position={Position.Top}
          />
          <Handle
            type="source"
            position={Position.Bottom}
          />
        </Card>
  )
}

export default ResetStepNode
