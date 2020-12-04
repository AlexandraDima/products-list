import React from 'react';
import Modal from './ui/Modal/Modal';


const ProductDescription = (props)=>{
               return (
                <Modal show={props.show} clicked={props.clicked}>
                                        <img className="imgPr" src={`${props.image}`} key={props.id}alt='productImage'/>
                </Modal>  
                         )
}
export default ProductDescription; 