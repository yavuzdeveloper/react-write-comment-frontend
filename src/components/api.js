import axios from "axios";

//bu şekilde diğer sayfalarda api().get('/posts') yazdığımızda daha kısa olacak
//büyük projelerde kullanışlı olacak

export function api() { //direk export ettiğimi için diğer comp lerde import ederken {api} şeklinde yazcaz
    return axios.create({
        baseURL: "https://react-yazi-yorum.herokuapp.com",
    });
}

