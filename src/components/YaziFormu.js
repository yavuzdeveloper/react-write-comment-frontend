import React, { useState, useEffect } from 'react';
import axios from "axios";
import { api } from "./api";
import { withRouter } from 'react-router-dom';



const YaziFormu = (props) => {
    const [yazi, setYazi] = useState({ 
        title:"", 
        content:""
    });
    const [hata, setHata] = useState("");

    const onInputChange = (event) => 
        setYazi({ ...yazi, [event.target.name]: event.target.value });  

    const onFormSubmit = (event) => {
        event.preventDefault(); 
        setHata("");

    if (props.yazi?.title) {
        api()
        .put(`/posts/${props.match.params.id}`, yazi)
        .then((response) => {
            props.history.push(`/posts/${props.match.params.id}`);
        })
        .catch((error) => {
            setHata("Başlık ve yazı içeriği alanlarının doldurulması zorunludur.");
        });

    } else {
        axios.post('https://react-yazi-yorum.herokuapp.com/posts', yazi)
        .then((response) =>{    
          props.history.push('/'); 
        })
        .catch((error) => {
            setHata("Başlık ve yazı içeriği alanlarının doldurulması zorunludur.");
        });

    }  
    };


    useEffect(() => {
       if( props.yazi?.title && props.yazi?.content ) setYazi(props.yazi);    
    }, [props.yazi]);


    return(
        <React.Fragment>
        {hata && (
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