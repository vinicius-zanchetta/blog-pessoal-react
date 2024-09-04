import { useContext, useEffect } from "react";
import ModalPostagem from "../../components/postagens/modal/ModalPostagem"
import AuthContext from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";

function Home() {

  const { usuario } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (usuario.token === '') {
      ToastAlerta('Você precisa estar logado', 'info');;
      navigate('/login');
    }
  }, [usuario.token]);


  return (
    <div className="bg-indigo-900 flex justify-center">
      <div className="container grid grid-cols-2 text-white">
        <div className="flex flex-col gap-4 items-center justify-center py-4">
          <h2 className="text-5xl font-bold">Seja Bem Vinde!</h2>
          <p className="text-xl">Expresse aqui seus pensamentos e opiniões</p>
          <div className="flex justify-around gap-4">
            <div className="rounded border-white border-solid border-2 py-2 px-4 cursor-pointer">
              <ModalPostagem />
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-2/3"
            src="https://i.imgur.com/VpwApCU.png"
            alt="Imagem de Página Home" />

        </div>
      </div>
    </div>
  )
}


export default Home