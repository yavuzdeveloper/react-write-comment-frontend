import React, { useEffect, useState } from 'react';
import { api } from './api';
import YaziFormu from './YaziFormu'; 


const YaziDuzenle = (props) => {
    const [yazi, setYazi] = useState({title:"", content:""}); 
    const { id } = props.match.params;
    

    useEffect(() => {
        api()
        .get(`/posts/${id}`)
        .then((response) => {
            setYazi({title: response.data.title, content: response.data.content }); 
        });
    }, []);

    return(
        <div>
        <h1>Yazı Düzenleme Formu</h1>
            <YaziFormu yazi={yazi} />
        </div>
    );
};

export default YaziDuzenle;