import React, { useEffect, useState } from 'react';
import axios from 'axios';


//id ler ile detaya yönlecek id leri almak için içine props yazdık ve consolda gelen propsları gördük
const YaziDetayi = (props) => {
    //console.log("PROPS id:",props.match.params.id); id yi gördük
    const { id } = props.match.params;
    const [yaziDetayi, setYaziDetayi] = useState({}); //yazi detayını burda tutcaz
    
    useEffect(() => {
        axios
            .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`)
            .then((response) => {
                setYaziDetayi(response.data); //datayı state e attık
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <React.Fragment>
        <h2 className="ui header">{yaziDetayi.title}</h2>
        <p>{yaziDetayi.content}</p>
        <p>{yaziDetayi.created_at}</p>
        </React.Fragment>
    );
}

export default YaziDetayi;