import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useState } from 'react'

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="mx-auto w-xs bg-base-200 border-base-300 rounded-box border p-4"> 
            {
                isLogin
                ?
                    (
                        <LoginForm/>

                    )
                :
                    (
                        <RegisterForm/>

                    )
            }
         <button className='cursor-pointer'
            onClick={(e) => {
            e.preventDefault(); // ⬅️ Evita que el form haga submit
            setIsLogin(!isLogin);
            }}
        >
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>

        </div>

  )
}

export default AuthPage
