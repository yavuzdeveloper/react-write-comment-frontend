import React, { useState, useEffect } from 'react';
import axios from "axios";
import { api } from "./api";
import { withRouter } from 'react-router-dom';//bunu yazma sebebi axios ile yeni yazıyı api ye post ettiksen sonra otomatik anasayfaya dönmek istiyoruz bunu da history içindeki push ile yapmalıyız
//fakat yaziformu comp app te route olmadığı içinde propsunun içinde push yok onun için bu yönlendirmeyi yapmalıyız.exportta da yazcaz
//böylece history push gelmiş oldu

//yaziformu comp hem yazı eklerken hemde yazi düzenlerken kullanacağız hem kendi içinde yazi var hemde props olarak gelen yazi var
//bu iki yazi bilgisi için aşağıda bir useeffect içinde değerlenirme yapcaz


//yazi ve setyaziyi oluşturup ilk boş değerlerini verdikten sonta aşağıda inputlar a value değerleini verdik
//ve oninputchange metodunu oluşturduk
//inputtaki girilen değeri consolda gördük.artık gönder butonuna basıldığında api ye bir sorgu göndererek vt nına kaydetcez
//api ye sorgu gönderip vt kaydetmek için bir metod lazım bunada formsubmit dedik;
//yorum gönderme işleminde butona saddece type olarak submit vermiştik form etkin kullandık 
//burada ise butona onClick={onformsubmit}  dedik yani butonu etkin kullandık




const YaziFormu = (props) => {
    //console.log("GELEN PROPS:",props.yazi); //ilk boş geliyor dolusu geç geliyor
    const [yazi, setYazi] = useState({ 
        title:"", 
        content:""
    });//apide olması zorunlu olan alanları koyduk içine yani title ve content
    const [hata, setHata] = useState("");

const onInputChange = (event) => 
    setYazi({ ...yazi, [event.target.name]: event.target.value});//yazi yı açtık ve içine e.t.value yu name olarak kaydettik
//console.log("YAZI FORMU:", yazi);

//GÖNDER butonu onformsubmit ile hem hem yeni yazıekleme hemde edit i göndereceği için bazı düzenlemeler yapıyoruz:
//yani burda yazı ekleme için bir api sorgusu var birde edit için api sotgusu eklicez 
//bunuda şöyle yapcaz eğer edit yapcaksak düzenleme kısmından yazi gelir gelmezse yeni ekleme kısmındayız demektir
//ekleme de post, editte put methotlarını kullancağız

const onFormSubmit = (event) => {
    event.preventDefault();//aslında burda form değil butonda kullandık submit i pd a gerek yok tu ama garanti olsun diye yaptık
//axios ile post gönderiyoruz ve ikinci parametre olarakta içinde title ve content olan yazi yı yazdık    
    setHata("");//hatanın içini boşalttık.eski hata varsa temizledik

    if (props.yazi?.title) {
        //console.log("edit mod");
        api()
        .put(`/posts/${props.match.params.id}`, yazi)
        .then((response) => {
            //console.log("EDİT", response);
            props.history.push(`/posts/${props.match.params.id}`); //KULLANICIYI aynı yere geri gönderiyoruz
        })
        .catch((error) => {
            setHata("Başlık ve yazı içeriği alanlarının doldurulması zorunludur.");
        });

    } else {
        axios.post('https://react-yazi-yorum.herokuapp.com/posts', yazi)
        .then((response) =>{//burda then ile olumlu gelen responsu yakaldık
    //console.log(response);
    //burda yazılan ve vt nına gönderilen yazılar anasyfada direk görünecek çünkü yazilistesi comp de kullandığımız useeffect compdidmount gibi sayfa heryüklendiğinde verileri alıyor apiden
    //Ancak redux ile yapmış olsaydık state ler stor da tutulduğu için state in güncellnemesi gerekecekti. gönderilen yazı otomayik ana sayfada görünmeyecekti.
    //çünkü react ta comp her yüklendiğinde api sorgusu yapıyo. redux ta stateler store dan geldiği için yazıyı anasayfada görmel için önce store yüklenmeli
    
          props.history.push('/'); //props içinden gelen history.push ile anasayfaya yönlendirdik 
        })
        .catch((error) => {//yukarda hata state i yazdık ve hata durumunda bu mesajı göstercez.hatayı ekranda göstermek içinde aşağıda yazı ekleme formu yazısının altına yazdık
            setHata("Başlık ve yazı içeriği alanlarının doldurulması zorunludur.");
        });

    }  
};

//eğer bu if te hata alırsak ki aldık yani props.yazi içinde title yok derse undefined. ozaman yazi yanına bir ? koyuyoruz yani yazi yoksa hiç bakmıyor ve hata vermiyor
    useEffect(() => {
        //console.log("GELEN PROPS:", props );
       if( props.yazi?.title && props.yazi?.content ) setYazi(props.yazi);
//eğer propstan gelene title ve content varsa setyazi yı props yazi yazı yap demek        
    }, [props.yazi]);//yani props.yazi değişirse bu useeffect çalışcak. bu useeffect bu diziye bağimli

//console.log("YEREL STATE:", yazi);

    return(
        <React.Fragment>
        {hata && ( //yani hata varsa bu mesajı göstecek
           <div className="ui error message">
                <div className="header">Hata</div>
                <p>{hata}</p>
            </div> 
        )}
            <div className="ui form">
            <div className="field">
                <label>Yazı Başlığı</label>
                <input 
                type="text" 
                value={yazi.title} 
                name="title" 
                onChange={onInputChange} 
                />
            </div>
            <div className="field">
                <label>Yazı İçeriği</label>
                <textarea 
                rows="3" 
                value={yazi.content} 
                name="content" 
                onChange={onInputChange} 
                ></textarea>
            </div>
                <button 
                className="ui primary button"
                onClick={onFormSubmit}
                >
                Gönder
                </button>
                <button className="ui button">
                İptal Et
                </button>
        </div>

        </React.Fragment>
        
    );
};

export default withRouter(YaziFormu);