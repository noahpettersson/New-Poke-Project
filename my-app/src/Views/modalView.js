import Button from '@mui/material/Button'
import Modal from 'react-bootstrap/Modal'

function MyVerticallyCenteredModal(props) {
    
    function yesClicked() {
        props.onHide("yes")
    }

    function noClicked() {
        props.onHide("no")
    }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Body>
            <p>
            You will lose your score if you continue to menu, do you want to proceed?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={yesClicked}>Yes</Button>
            <Button variant="contained" onClick={noClicked}>No</Button>
        </Modal.Footer>
        </Modal>
    );
    }

export default MyVerticallyCenteredModal;