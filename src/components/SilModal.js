import React, { useState } from 'react'
import { Button, Modal } from "semantic-ui-react";

//hangi yazıyı sileceğimizi bilmemiz lazım onun için yazıdetayından buraya yazıyı göndermeliyiz
// yazıdetayı comp den yazi adı altında yazıDetayı state i iindekileri buraya gönderdik ve func yazi olarak içine aldı (dis. yaparak direk yazdık {}içinde)
//

const SilModal = ({ yazi }) => {
    //console.log("SİLMODAL A GELEN:", yazi); gelen yazıyı gördük
    const [open, setOpen] = useState(false);
    const show = () => setOpen(true);
    const close = () => setOpen(false);


    return <React.Fragment>
        <Button color="red" onClick={show} >Sil</Button>
        <Modal size="mini" open={open} onClose={close}>
            <Modal.Header>Yazıyı Sil</Modal.Header>
            <Modal.Content>
                <p>Bu yazıyı silmek istediğinizden eminmisiniz?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={close}>İptal Et</Button>  
                <Button 
                positive icon="delete" 
                LabelPosition="right" 
                content="Evet Sil"
                //onClick={}//func çağırıcaz bu func api bir istek gönderip (api request) bu yazının silinmesini isteyecek
                />
            </Modal.Actions>
        </Modal>
    </React.Fragment>
}

export default SilModal;