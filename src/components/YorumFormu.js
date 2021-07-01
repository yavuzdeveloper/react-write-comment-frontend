import React, { useState } from 'react';

//bu comp e taşımamaız gereken handlecommentsubmit, handleOnChange, yorum, handleOnChange

const YORUM_BASLANGIC = {
  display_name: "",  
  body: "",
};

const YorumFormu = (props) => {
  const [yorum, setYorum] = useState(YORUM_BASLANGIC)

  const handleOnChange = event => {
    // //içine event alıp setcommentbody yi çağırıp içine bi obje göndercek: ...commentbody önceki değerleini koruyacak üzerine ekleyecek yani
    // //ve eventten gelen target in name ile eventten gelen target in değerini kaydetcek 
    // //burdaki name aşağıda body ve display_name olarak verildi (inputlarda) ona göte state lerini değiştirecek   
            setYorum({...yorum, [event.target.name]: event.target.value})
        }
    
  
    return (
        <React.Fragment>
            <h3>Yorum Yaz:</h3>
          <form className="ui form" 
              onSubmit={(event) => {
              event.preventDefault();//formun sayfa yenileme işlemini iptal ettik
              props.handleSubmit(yorum, event); //propslardan aldığımız handlesubmit i burda kullandık
              setYorum(YORUM_BASLANGIC);//yorumu boşalttık
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