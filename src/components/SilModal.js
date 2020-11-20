import React, { useState } from 'react'
import { Button, Modal } from "semantic-ui-react";
import { api } from './api';

//hangi yazıyı sileceğimizi bilmemiz lazım onun için yazıdetayından buraya yazıyı göndermeliyiz
// yazıdetayı comp den yazi adı altında yazıDetayı state i iindekileri buraya gönderdik ve func yazi olarak içine aldı (dis. yaparak direk yazdık {}içinde)
//

const SilModal = ({ yazi, push }) => {
    //console.log("SİLMODAL A GELEN:", yazi); //gelen yazıyı gördük
    const [open, setOpen] = useState(false);
    const [hata, setHata] = useState("");
    const show = () => setOpen(true);
    const close = () => setOpen(false);
    

    const handleDelete = (id) => {
        api()
        .delete(`/posts/${id}`)
        .then(() => { //başarılı olırsa burayı yapıyoruz yani modal kapat ve ana sayfaya yönlen
            setHata("");// hata mesajı sonrası yeni bir istek yapılabilir onun için hata mesajını temziledik
            close();
            push(`/`);//burda push metodu yok bunun için iki yol var 1.withRouter ile yönlendirme 2. yaziDetayındaki push metodunu yazi ile beraber buraya gönderme
//biz yazi ile beraber push metodunu da aldık yukrda func içine yazdık ve burda kullanarak anasayfaya yönlendiridik            
        })
        .catch(()=> { //başarılı olmazsada istek. burda hata mesajı vercek yukarda yazdığımız hata state ini güncelleyerek
            setHata("Yazıyı silerken hata oluştu");
//bu hatayı da aşağıda bir yerde göstermeliyiz.  hata varsa gösteriyo          
        });
    };


    return <React.Fragment>
        <Button color="red" onClick={show} >Sil</Button>
        <Modal size="mini" open={open} onClose={close}>
            <Modal.Header>Yazıyı Sil</Modal.Header>
            <Modal.Content>
                <p><b>{yazi.title} başlıklı yazıyı silmek istediğinizden eminmisiniz?</b></p>
                {hata && <p>{hata}</p>}
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={close}>İptal Et</Button>  
                <Button 
                positive icon="delete" 
                LabelPosition="right" 
                content="Evet Sil"
                onClick={()=> handleDelete(yazi.id)}//func çağırıcaz bu func api bir istek gönderip (api request) bu yazının silinmesini isteyecek.ve yukarda oluşturduk bu func
                />
            </Modal.Actions>
        </Modal>
    </React.Fragment>
}

export default SilModal;