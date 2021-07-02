import React, { useState } from 'react'
import { Button, Modal } from "semantic-ui-react";
import { api } from './api';


const DeleteModal = (props) => {
   
    const [open, setOpen] = useState(false);
    const show = () => setOpen(true);
    const close = () => setOpen(false);
    
    const handleDelete = (id) => {
        console.log("AAAA:", id);
        api()
        .delete(`/posts/${id}`)
        .then(() => { 
            close();         
        })
        .catch((err)=> {
            console.log(err)       
        });
    };


    return <React.Fragment>
        <Button color="yellow" onClick={show}>Delete</Button>
            <Modal size="mini" open={open} onClose={close}>
            <Modal.Header>Delete Comment</Modal.Header>
            <Modal.Content>
            <p><b>Are you sure want to delete the comment?</b></p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={close}>Cancel</Button>  
                <Button 
                positive icon="delete" 
                LabelPosition="right" 
                content="Yes Delete"
                onClick={()=> handleDelete(props.yorumlar.id)}
                />
            </Modal.Actions>
            </Modal>
    </React.Fragment>
 
}

export default DeleteModal;