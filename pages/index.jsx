import styles from '../styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
    const [model, setModel] = useState(null)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    let changeField = (field) => (e) => {
        setModel(
            Object.assign({}, model, {
                [field]: e.target.value,
            })
        );
    };

    const handleClick = async () => {
        setToken(null)
        axios({
            method: 'post',
            url: "http://localhost:8000/api/auth/login",
            params: model
          })
          .then((data) => {
            console.log('data', data)
            setToken(data.data.access_token)
          })
          .catch((e) => {
            console.log('error', e);
          })
    }

    const checkUser = async() => {
        setUser(null)
        axios({
            method: 'post',
            url: "http://localhost:8000/api/auth/me",
            headers: {
                "Authorization": `Bearer ${token}`
            }
          })
          .then((data) => {
            console.log(data);
            setUser(data.data)
          })
          .catch((e) => {
            console.log('error', e);
          })
    }

    console.log('user', user);
    return (
        <div className={styles.container}>
            <div>
                <input 
                    type="email" 
                    placeholder="email" 
                    onChange={changeField('email')} 
                />
                <input 
                    type="text" 
                    placeholder="password"
                    onChange={changeField('password')}  
                />
                <button onClick={() => handleClick()}>войти</button>
            </div>
            <div>
                {
                    token ? <strong>{token}</strong> : <strong>не авторизован</strong>
                }
            </div>
            <div style={{"marginTop": "100px"}}>
                <strong>test user</strong>
                <button onClick={() => checkUser()}>Проверить токен</button>
                {
                    user 
                    ? <div>
                        <p>id: {user.id}</p>
                        <p>email: {user.email}</p>
                    </div> : null
                }
            </div>
        </div>
    )
}
