import React from 'react';
import DeleteModal from './DeleteModal';


const YorumListesi = (props) => {
    //console.log("YORUM:",props);
    return (
        <React.Fragment>
             <h3>YORUMLAR</h3>
                {props.yorumlar.map(yorum => {
                    return(
                        <div className="ui relaxed list"
                        key={yorum.id}>
                            <div className="item">
                                {/* <img 
                                className="ui avatar image" 
                                src="/images/avatar/small/daniel.jpg" 
                                /> */}
                                <div className="content">
                                <span className="header">{yorum.display_name}</span>
                               
                                <div className="description">{yorum.body}</div>
                                <br/>
                                
                                <DeleteModal yorumlar={props.yorumlar}/>
                                </div>
                            </div>
                        </div>)
                })}
        </React.Fragment>
        )
}  

export default YorumListesi;