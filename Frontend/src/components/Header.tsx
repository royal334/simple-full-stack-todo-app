import { useTheme } from "../store/ThemeContext"
import{ Sun, Moon } from 'lucide-react'

function Header() {

     const { theme, toggleTheme } = useTheme()

  return (
     <div className='container mx-auto flex justify-between'>
     <h1 className='text-white font-semibold text-2xl md:text-4xl uppercase'>Todo</h1>
     <button onClick={toggleTheme}>{theme === 'light' ?<Moon color='#ffffff'/> : <Sun color='#ffffff'/> }</button>
     </div>
  )
}

export default Header