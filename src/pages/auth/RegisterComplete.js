import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import axios from 'axios'


const createOrUpdateUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
        headers: {
            authtoken,
        }
    })
}



const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let dispatch = useDispatch()



    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [history])

    const handleSubmit = async (e) => {
          e.preventDefault();

          // validation
          if(!email || !password) {
             toast.error('Email and password is required');
             return
          }

          if(password.length < 6 ) {
            toast.error('Password must be at least 6 caractere long');
            return
         }

          try {
             const result = await auth.signInWithEmailLink(email, window.location.href);

             if(result.user.emailVerified) {
                 // remove user email from local storage
                 window.localStorage.removeItem("emailForRegistration");
                 // get user id token
                 let user = auth.currentUser
                 await user.updatePassword(password);
                 const idTokenResult = await user.getIdTokenResult()
                 //redux store
                 createOrUpdateUser(idTokenResult.token)
                 .then(res => {
                     dispatch({
                         type: 'LOGGED_IN_USER',
                         payload: {
                           name: res.data.name,
                           email: res.data.email,
                           token: idTokenResult.token,
                           role: res.data.role,
                           _id: res.data._id
                         },  
                       });
                     }) .catch();
                 //redirect
                 history.push('/')

             }
          } catch (error) {
              console.log(error);
            toast.error(error.message);
          }
    

    }

    const completeRegistrationForm = () =>
     <form onSubmit={handleSubmit}>
          <input type="email" className="form-control" value={email}  disabled />
          <input 
           type="password"
           className="form-control" 
           value={password}
           onChange={e => setPassword(e.target.value)}
           placeholder="Password"
           autoFocus
           />

          <button type="submit" className="btn btn-raised">RegisterComplete</button> 
    </form>
    
    return (
        <div className="container p-5">
            <div class="row">
                <div className="col-md-6 ofset-md-3">
                    <h4>RegisterComplete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete
