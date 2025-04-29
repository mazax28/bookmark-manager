import {create} from 'zustand';

// Estamos un objeto con una propiedad theme que tiene un valor por defecto de "forest"
export const useThemeStore = create((set) => ({
    theme: localStorage.getItem('preferred-theme') || 'dark',

    setTheme: (theme) =>{
        localStorage.setItem('preferred-theme', theme)
        set({theme})
    }


}))