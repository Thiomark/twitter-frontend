import axios from 'axios'

let mainURL = '/api/v1/';
if(process.env.NODE_ENV === 'development'){
    mainURL = 'http://localhost:5000/api/v1/'
}

export default () => {
    return axios.create({
        baseURL: mainURL,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
        }   
    })
}