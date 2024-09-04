import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardTema from "../card/CardPostagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";


function ListaPostagens() {
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagens() {
    try {
      await buscar('/postagens', setPostagens, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        ToastAlerta('O token expirou, favor logar novamente', 'info')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');;
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    buscarPostagens();
  }, [postagens]);

  return (
    <>
      {postagens.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex justify-center w-full">
        <div className="container flex flex-col">
          <div className="
            grid grid-cols-1 my-8 mx-8 gap-8
            md:grid-cols-2
            lg:grid-cols-3 ">
            {postagens.map((postagem) => (
              <>
                <CardTema key={postagem.id} postagem={postagem} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaPostagens;