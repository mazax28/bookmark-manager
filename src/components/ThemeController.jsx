import React from 'react'
import { useThemeStore } from '../store/themeStore'

function ThemeController() {
    const { theme, setTheme } = useThemeStore()

    const handleToggle = (e) => {
      const newTheme = e.target.checked ? 'light' : 'dark'
      setTheme(newTheme)
    }
  
    return (
      <label className="flex cursor-pointer gap-2 items-center">
        {/* Dark icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" />
        </svg>
  
        <input
          type="checkbox"
          className="toggle theme-controller"
          onChange={handleToggle}
          checked={theme === 'light'}
        />
  
        {/* Light icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      </label>
    )
}

export default ThemeController
