import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { api } from "./api";

const YaziListesi = (props) => {
  const [yaziListesi, setYaziListesi] = useState([]); //axios ile aldığımı dta yı burda tutcaz

  useEffect(() => {
    axios //api().get("/posts") bu ve alt satır yerine bunu yazabiliriz api yi yukarda import ettikten sonra
      .get("https://react-yazi-yorum.herokuapp.com/posts")
      .then((response) => {
       //console.log("RESPONSE:",response); baktık ve yazıları data nın tuttuğunu gördük. ve bunları tutacak state yukarda oluştrduk.
        setYaziListesi(response.data);  
      });
  }, [])

  //console.log({ yaziListesi }); listeyi consolda gördük
  //aşağıda yazilistesini map leyip item ile döndürcez:
    return  (
    <div className="ui relaxed divided list">
      {yaziListesi.map(yazi => {
          return (<div className="item" key={yazi.id}>
            <i className="large github middle aligned icon"></i>
            <div className="content">
              <Link to={`/posts/${yazi.id}`} className="header">
              {yazi.title}
              </Link>
              <div className="description">{yazi.created_at}</div>
            </div>
          </div>
          );
        })}  {""}
      </div>
    ); 
};

export default YaziListesi;