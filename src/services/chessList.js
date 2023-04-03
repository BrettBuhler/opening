import axios from 'axios'
/**
 * chessList links the apps's front end and backend using axios.
 * The backend has cors functionality enabled.
 */

//backend hosted using google's app engine
const baseUrl = 'https://opening-db.uc.r.appspot.com/api/users'

//get a user's data by username (email for users who login, or 'guest' for those who don't)
const getUser = async (userName) => {
    const req = axios.get(`${baseUrl}/${userName}`)
        .then(res => {
           return res.data
        }).catch(error=>{
            const newReq = createUser({openings:{},userName:userName})
            return newReq.then(res=>res)
        })
    const res_2 = await req
    return res_2
}

//create a new user
const createUser = async (userObject) => {
    const req = axios.post(baseUrl, userObject)
    try {
        const res = await req
        return res.data
    } catch (error) {
        console.log(error.response.data.error)
    }
}

//delete a user
const deleteUser = async (userName) => {
    const req = axios.delete(`${baseUrl}/${userName}`)
    const res = await req
    return res
}

export default { getUser, createUser, deleteUser }