
import { useState } from "react"
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { verifyEmail } from "../api/authApi"
import { useAuthStore } from "../store/authStore"
function VerifyCodeForm() {
    const [code, setCode] = useState({
        token: ''
    })
    const navigate = useNavigate()
    const {verifyUser,setError} = useAuthStore()
    const {mutate,isPending} = useMutation({
        mutationFn: verifyEmail,
        onSuccess: (data) => {
          toast.success('¡Verficacion exitosa!');
          verifyUser(data.user)
          navigate('/home')
          console.log('Datos del login:', data);
          // Puedes redirigir aquí por ejemplo
        },
        onError: (error) => {
          toast.error('Error al Registrarte. Verifica tus datos.');
          console.error('Error:', error);
        }
      });
    const handleSubmit = (e) =>{
        e.preventDefault()
        mutate(code)
    }
    const handleChange = (e) =>{
        setCode({
            ...code,
            [e.target.name]: e.target.value
        })
    }

  return (
       <form className="fieldset" onSubmit={handleSubmit}>
            <legend className="text-2xl text-center">Validar Correo</legend>
            <label className="label">Codigo</label>
            <input name='token' value={code.token} onChange={handleChange} type="text" className="input" />

            <button type='submit' className="btn btn-neutral mt-4">
              {
                isPending ? (<span className="loading loading-bars loading-xs"></span>
                ) : 'Validar'
              
              }
            </button>
            <p className="text-center mt-4">
                ¿No has recibido el correo? <button className="btn btn-link" onClick={() => {}}>Reenviar</button>
            </p>
    </form>
  )
}

export default VerifyCodeForm
