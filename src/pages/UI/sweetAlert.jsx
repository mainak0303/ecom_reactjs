import SweetAlert from "react-bootstrap-sweetalert";
function SweetAlertComponent({ confirm, cancle, title, subtitle, type }) {
  return (
    <SweetAlert
    type={type}
    showCancel
    confirmBtnText="Yes, delete it!"
    confirmBtnBsStyle="danger"
    title={title}
    onConfirm={confirm}
    onCancel={cancle}
    focusCancelBtn
    >
    {subtitle}
    </SweetAlert>
  );
}

export default SweetAlertComponent;