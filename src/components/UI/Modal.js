import { Fragment } from 'react'
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import closebtn from '../UI/images/close-white.png'

//The blackscreen behind the modal
const Backdrop = (props) => {
    return <div className={styles.backdrop}></div>
}

//The modal
const ModalOverlay = (props) => {
    return <div className={styles.card}>
        {props.children}
    </div>
}

const Modal = props => {
    return (
        <Fragment>
            <img className={styles["close-btn"]} style={{ position: "fixed", top: "6%", left: "73%", zIndex: "10" }} onClick={props.onClose} width="40" height="40" src={closebtn} />

            {ReactDOM.createPortal(<Backdrop />, document.getElementById('overlay'))}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ ModalOverlay>, document.getElementById('overlay'))}
        </Fragment>
    )
}

export default Modal;