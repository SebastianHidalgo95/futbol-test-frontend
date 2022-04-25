import axios from 'axios'
export const getTokenApi = async () => {
    const resp = await axios({ url: 'login', data: { 
        email:"test@test.com",
        password: "secret123",
    }, method: 'POST'})
    const token = 'Bearer'+ resp.data.token
    axios.defaults.headers.common['Authorization'] = token
    console.log('loggeado')
    localStorage.setItem('token',token)
}



