import React from 'react';

//yaziyorumlarından props olarak gelen yorumları aşağıda props.yorumlar olarak map ledik...

const YorumListesi = (props) => {
    return (
        <React.Fragment>
             <h3>YORUMLAR</h3>
                {props.yorumlar.map(yorum => {//map lerken herzaman en üstteki eleman key almalı ki react bu elemanların sırasını dom da tanıyabilsin
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
                                </div>
                            </div>
                        </div>)
                })}
        </React.Fragment>
        )
}  

export default YorumListesi;