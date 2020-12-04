import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';


const Modal = (props) =>(
    <div>
    <Backdrop show={props.show} clicked={props.clicked}/>
    <div 
        style = {{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '0.9' :'0'
        }}
        className={classes.Modal}>
        {props.children}
    </div>
    </div>
);
export default Modal;