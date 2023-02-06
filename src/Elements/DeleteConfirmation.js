import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;

const DeleteConfirmation = () => {
  confirm({
    title: "Are you sure you want to delete this configuration?",
    icon: <ExclamationCircleFilled />,
    content: "Unsaved progress will be lost",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      console.log("ok");
    },
    onCancel() {
      console.log("nope");
    },
  });
};
export default DeleteConfirmation;
