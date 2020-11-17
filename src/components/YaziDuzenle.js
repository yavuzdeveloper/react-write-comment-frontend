import React, { useEffect, useState } from 'react';
import { api } from './api';
import YaziFormu from './YaziFormu'; 


const YaziDuzenle = (props) => {
    const [yazi, setYazi] = useState({title:"", content:""}); //response.data yı yazıformuna aşağıda props olarak gönderebilmek için bu state i yazdık
    const { id } = props.match.params;//props ile gelen id yi aldık
    //console.log({ id }); consolda yazıdüzenlemeye gelen id yi gördük ve geriye api reguest kaldı useeffect içinde:
    

        useEffect(() => {//içindeki func sadece comp yüklendiğinde çalışacak
            api()
                .get(`/posts/${id}`)
                .then((response) => {
console.log("YAZIDÜZENLE RESPONSE DATA", response.data); //apiden adığımız ilgili id li bilgileri consolda gördük şimdi bunu forma aktarcaz
//aktarma işlemini propsla dolayısıyla da bu datayı bir state e atmalıyız

setYazi({title: response.data.title, content: response.data.content }); //data daki yazıyı state e ve ordanda props la yaziFormuna gönderdik
//yukarda istersek alt comp sadece {title:response.data.title, content:response.data.content} title ve content i gönderebiliriz
console.log("setyazi YAZIDÜZENLE RESPONSE DATA", response.yazi);
                })
        }, []);

    return(
        <div>
        <h1>Yazı Düzenleme Formu</h1>
            <YaziFormu yazi={yazi} />
        </div>
    );
};

export default YaziDuzenle;