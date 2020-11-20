import React, { useState } from 'react'
import { Button, Modal } from "semantic-ui-react";
import { api } from './api';


const DeleteModal = (props) => {
    console.log("MODAL A GELEN YORUMLAR:",props);
    const [open, setOpen] = useState(false);
    const show = () => setOpen(true);
    const close = () => setOpen(false);
    
    const handleDelete = (id) => {
        api()
        .delete(`/posts/${id}`)
        .then(() => { //başarılı olırsa burayı yapıyoruz yani modal kapat ve ana sayfaya yönlen
           // setHata("");// hata mesajı sonrası yeni bir istek yapılabilir onun için hata mesajını temziledik
            close();
            //push(`/`);//burda push metodu yok bunun için iki yol var 1.withRouter ile yönlendirme 2. yaziDetayındaki push metodunu yazi ile beraber buraya gönderme
//biz yazi ile beraber push metodunu da aldık yukrda func içine yazdık ve burda kullanarak anasayfaya yönlendiridik            
        })
        .catch(()=> { //başarılı olmazsada istek. burda hata mesajı vercek yukarda yazdığımız hata state ini güncelleyerek
           // setHata("Yazıyı silerken hata oluştu");
//bu hatayı da aşağıda bir yerde göstermeliyiz.  hata varsa gösteriyo          
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