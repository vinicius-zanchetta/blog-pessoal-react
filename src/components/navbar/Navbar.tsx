import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext)

  function logout() {
    handleLogout();
    ToastAlerta("O usuário foi desconectado!", 'info')
    navigate("/")
  }

  let component: ReactNode;


  if (usuario.token !== "") {

    component = (
      <div className="bg-indigo-900 flex justify-between items-center px-16 text-white py-4">
        <div>
          <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>
        </div>
        <div>
          <ul className="flex items-center px-16 gap-4">
            <Link to='/postagens' className='hover:underline'>
              <li className="cursor-pointer">Postagens</li>
            </Link>
            <Link to='/temas' className='hover:underline'>
              <li className="cursor-pointer">Temas</li>
            </Link>
            <Link to='/cadastroTema' className='hover:underline'>
              <li className="cursor-pointer">Cadastrar Tema</li>
            </Link>
            <li className="cursor-pointer">Perfil</li>
            <Link to='' onClick={logout} className='hover:underline'>
              <li className="cursor-pointer">Sair</li>
            </Link>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <>
      {component}
    </>
  )
}

export default Navbar