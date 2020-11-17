import React from 'react';
import YorumFormu from './YorumFormu';
import YorumListesi from './YorumListesi';

//yazidetayı comp den prps olarak gelen yorumları burda adık ve yorumlistesi comp ine props olarak gönderdik

const YaziYorumalari = (props) => {
    return(<React.Fragment>
        <YorumListesi yorumlar={props.yorumlar}/>
        <YorumFormu handleSubmit={props.handleSubmit} />
    </React.Fragment>)
}

export default YaziYorumalari;