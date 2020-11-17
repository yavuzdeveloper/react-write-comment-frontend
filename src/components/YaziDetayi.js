import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YaziYorumlari from './YaziYorumlari';
import { Link } from 'react-router-dom';
import SilModal from './SilModal';


//comp leri ayırdık yorumlar burda api den alındığı için aşağıda önce yaziyorumlarına gönderiliyor ordan da yorumlis comp göndeiriliyor

// const YORUM_BASLANGIC = {
//     display_name: "",  
//     body: "",
// }


//id ler ile detaya yönlecek id leri almak için içine props yazdık ve consolda gelen propsları gördük
const YaziDetayi = (props) => {
    //console.log("PROPS id:",props.match.params.id); id yi gördük
    const { id } = props.match.params;
    const [yaziDetayi, setYaziDetayi] = useState({}); //yazi detayını burda tutcaz
    const [yorumlar, setYorumlar] = useState([]); //yorumları burda tutcaz
    // const [display_name, setDisplay_name] = useState('');
    // const [body, setBody] = useState('');
    // const [yorum, setYorum] = useState(YORUM_BASLANGIC)//yukardaki 2 state i burda birleştirdik yorum göndermede kullanmak için 


//girilen yorumu api ye göndermek için. bu func kullanıyoruz get değil post. bu adrese reguest göndercez
//içine commentbody i alcak. adresten sonra virgülden sonra girilen obje veritb kaydetmek istediğimiz obje
    
    const handleCommentSubmit = (yorum, event) => { //bu fonk. aşağıda yorum formu com gönderdik
        axios
        .post(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`,
         yorum
         )
         .then((response) => {
//console.log("YORUM:",response); consolda eklenen yorumu gördük. artık state e eklicez diğer yorumalrın üzerine:
            setYorumlar([...yorumlar, response.data]);
           // setYorum(YORUM_BASLANGIC);//başlagıç a aldık yani boşalttık içini
        })
        .catch(error => {
            console.log(error)
        })
    };

//body ve dname tatelerini birleştirdiğimiz için aşağıda onchange olayı ile state i değiştiremizcez artık comment state içindeki objeleri değiştirmemiz gerekecek
//onun içinde bu func oluşturduk.her tuşa basıldığında hangi forma yazılıyorsa yazı gerekli state parçasına kaydetcek
   
//     const handleOnChange = event => {
// //içine event alıp setcommentbody yi çağırıp içine bi obje göndercek: ...commentbody önceki değerleini koruyacak üzerine ekleyecek yani
// //ve eventten gelen target in name ile eventten gelen target in değerini kaydetcek 
// //burdaki name aşağıda body ve display_name olarak verildi (inputlarda) ona göte state lerini değiştirecek   
//         setYorum({...yorum, [event.target.name]: event.target.value})
//     }

    useEffect(() => {
        axios
            .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`)
            .then((response) => {
                setYaziDetayi(response.data); //datayı state e attık
            })
            .catch((error) => {
                console.log(error);
            });

            axios
            .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`)
            .then((response) => {
                //console.log("COMMENTS",response);
                setYorumlar(response.data); 
            })
    });
    return (
        <React.Fragment>
        <h2 className="ui header">{yaziDetayi.title}</h2>
        <p>{yaziDetayi.content}</p>
        <p>{yaziDetayi.created_at}</p>
        <div className="ui buttons">
            <Link 
            to={`/posts/${yaziDetayi.id}/edit`} 
            className="ui blue button"
            >
            Düzenle
            </Link>
            <SilModal />
            {/* <Link       bu butonun yerine SilModel comp.de bir func oluşturduk onu kullancaz
            to="/" 
            className="ui red button"
            >
            Sil
            </Link> */}
        </div>

        {/* buraya:
         yorumlar-BAŞLIK
         yorumlar listesi
         yorum yazma formu
          gelecek.. bunun içinde yorumları api den alcaz useeffect içinde axios ile alıyoruz apiden
          ve yorumlar state ine attığımız yorumlar dizisini map leyip açcaz sematik ui kullanarak*/}
          
          {/* <h3>YORUMLAR</h3>
          {yorumlar.map(yorum => {//map lerken herzaman en üstteki eleman key almalı ki react bu elemanların sırasını dom da tanıyabilsin
            return(
                <div className="ui relaxed list" key={yorum.id}>
                    <div className="item">
                        <img className="ui avatar image" src="/images/avatar/small/daniel.jpg" />
                        <div className="content">
                        <a className="header">{yorum.display_name}</a>
                        <div className="description">{yorum.body}</div>
                        </div>
                    </div>
                </div>)
          })} */}

        <YaziYorumlari yorumlar={yorumlar} handleSubmit={handleCommentSubmit} />
      

          {/* <h3>Yorum Yaz:</h3>
          <form className="ui form" onSubmit={(e) => {
              e.preventDefault();//formun sayfa yenileme işlemini iptal ettik
              handleCommentSubmit(yorum);
              }}
          >
          <div className="ui mini icon input">
            <input 
                name="display_name"
                type="text" 
                placeholder="Name" 
                // onChange={(e) => setDisplay_name(e.target.value)} yerine artık aşağıdakini yazcaz
                onChange={handleOnChange}
                value={yorum.display_name}
            />
          </div>
          <textarea 
                name="body"
                placeholder="Yorumunuz" 
                rows="3" 
                // onChange={(e) => setBody(e.target.value)} 
                onChange={handleOnChange}              
                value={yorum.body}
          ></textarea>
            <button class="ui-blue button" type="submit">
                Yorum Gönder
            </button>
          </form> */}
        </React.Fragment>
    );
}

export default YaziDetayi;  