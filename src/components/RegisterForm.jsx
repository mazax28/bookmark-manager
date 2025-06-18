import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { registerUser } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
function RegisterForm() {
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: ''
    })
    // Estado para errores de validación
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        email: '',
        password: ''
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterData({
            ...registerData,
            [name]: value
        })
        // Limpiar errores al editar
        setValidationErrors({
            ...validationErrors,
            [name]: ''
        })
    }
    
    const navigate = useNavigate()
    const { register } = useAuthStore()
    
        
        const {mutate,isPending} = useMutation({
            mutationFn: registerUser,
            onSuccess: (data) => {
              toast.success('¡Registro exitoso!');
              register(data.user)
              navigate('/bookmarks')
              // Puedes redirigir aquí por ejemplo
            },
            onError: (error) => {
              toast.error('Error al Registrarte. Verifica tus datos.');
            
              console.error('Error:', error);
            }
          });
        
          const handleSubmit = (e) => {
            e.preventDefault();
            mutate(registerData);
          };
          console.log('isLoading:', isPending);

        
  return (
    <form className="fieldset" onSubmit={handleSubmit}>
            

                <legend className="text-2xl text-center">Crear Cuenta</legend>
                <label className="label">Name</label>
                <input name='name' value={registerData.name} onChange={handleChange} type="text" className="input" />
    
                <label className="label">Email</label>
                <input name='email' value={registerData.email} onChange={handleChange} type="email" className="input"/>
    
                <label className="label">Password</label>
                <input name='password' value={registerData.password} onChange={handleChange} type="password" className="input" />
    
                <button type='submit' className="btn btn-neutral mt-4">
                  {isPending ? (
                    <span className="loading loading-bars loading-xs"></span>

                  ) : 'Registrarme'}
                </button>
              

              
            
    </form>
   
  )
}

export default RegisterForm
