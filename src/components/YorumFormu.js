import React, { useState } from 'react';


const YORUM_BASLANGIC = {
  display_name: "",  
  body: "",
};

const YorumFormu = (props) => {
  const [yorum, setYorum] = useState(YORUM_BASLANGIC)

  const handleOnChange = event => {
    setYorum({...yorum, [event.target.name]: event.target.value})
  }
  
    return (
        <React.Fragment>
          <h3>Yorum Yaz:</h3>
          <form className="ui form" 
            onSubmit={(event) => {
            event.preventDefault();
            props.handleSubmit(yorum, event); 
            setYorum(YORUM_BASLANGIC);
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
            <button className="ui-blue button" type="submit">
                Yorum Gönder
            </button>
             <button className="ui-blue button" type="submit">
                Anasayfa
            </button>
          </form> 
        </React.Fragment>
    )
}

export default YorumFormu;