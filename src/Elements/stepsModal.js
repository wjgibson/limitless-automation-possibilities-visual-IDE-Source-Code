import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { useState } from 'react';

const stepsModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
      setIsModalOpen(false);
      props.setmodalopen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      props.setmodalopen(false);
    };
    useEffect(()=>{
        if(props.ismodalopen == true){
            setIsModalOpen(true);
        }
        
    },[props.ismodalopen])

  return (
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
  )
}

export default stepsModal
