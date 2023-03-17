import { Card,Radio} from 'antd'
import React from 'react'
import { Handle, Position } from 'reactflow'
import { useState } from 'react'

const NextStepNode = () => {


    const [value, setValue] = useState(1);
    const onChange = (e) => {
      setValue(e.target.value);
    };
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
              Next Step
            </h3>
          </div>
        }
        bordered={false}
        style={{
          width: 300,
          mixBlendMode: "difference",
        }}>
            <div>
           {value == 2 || value ==3 ?<Handle
            type="target"
            position={Position.Top}
            id="a"
            style={{left:10}}/> : null}
          <Handle
            type="target"
            position={Position.Top}
            id="b"
          />
         {value ==3 ?<Handle
            type="target"
            position={Position.Top}
            id="c"
            style={{marginLeft:140}}
          />:null}
          </div>

          <Handle
            type="source"
            position={Position.Bottom}
          />
         <p style={{ margin: 0, fontSize: "10px" }}>Step Type</p>
         <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>1</Radio>
      <Radio value={2}>2</Radio>
      <Radio value={3}>3</Radio>
    </Radio.Group>

        </Card>
      
  )
}

export default NextStepNode
