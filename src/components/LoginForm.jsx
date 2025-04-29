import { useState } from 'react'
import {toast} from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import {loginUser} from '../api/authApi'
import {useNavigate} from 'react-router-dom'
function LoginForm() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const navigate = useNavigate()
    const {mutate, isPending} = useMutation({
        mutationFn:loginUser ,
        onSuccess: (data) => {
          toast.success('¡Inicio de sesión exitoso!');
          console.log('Datos del login:', data);
          navigate('/home'); // Redirigir a la página de inicio después de iniciar sesión
          // Puedes redirigir aquí por ejemplo
        },
        onError: (error) => {
          toast.error('Error al iniciar sesión. Verifica tus datos.');
          console.error('Error:', error);
        }
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        mutate(loginData);
      };
    
    
  return (
    <form className="fieldset " onSubmit={handleSubmit}>
        <legend className="text-2xl text-center">Iniciar Sesion</legend>

        <label  className="label">Email</label>
        <input name='email' value={loginData.email} onChange={handleChange} type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input name='password' value={loginData.password} onChange={handleChange} type="password" className="input" placeholder="Password" />

        <button type='submit' className="btn btn-neutral mt-4">
          {
            isPending ? (<span className="loading loading-bars loading-xs"></span>
            ) : 'Iniciar Sesion'
          }
        </button>
    </form>
  )
}

export default LoginForm
