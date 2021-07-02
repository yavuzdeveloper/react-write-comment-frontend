import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YaziYorumlari from './YaziYorumlari';
import { Link } from 'react-router-dom';
import SilModal from './SilModal';




const YaziDetayi = (props) => {

    const { id } = props.match.params;
    const [yaziDetayi, setYaziDetayi] = useState({}); 
    const [yorumlar, setYorumlar] = useState([]);
  
    const handleCommentSubmit = (yorum, event) => { 
        axios
        .post(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`,
        yorum
        )
        .then((response) => {
            setYorumlar([...yorumlar, response.data]);
        })
        .catch(error => {
            console.log(error)
        });
    };


    useEffect(() => {
        axios
            .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`)
            .then((response) => {
                setYaziDetayi(response.data); 
            })
            .catch((error) => {
                console.log(error);
            });

            axios
            .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`)
            .then((response) => {
                setYorumlar(response.data); 
            });
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
            <SilModal yazi={yaziDetayi} push={props.history.push}/>
            {/* <Link       bu butonun yerine SilModel comp.de bir func oluşturduk onu kullancaz
            to="/" 
            className="ui red button"
            >
            Sil
            </Link> */}
        </div>

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