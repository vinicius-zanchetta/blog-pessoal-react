import { Link } from "react-router-dom"
import Tema from "../../../models/Tema"

interface CardTemaProps {
  tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <div className="text-white container bg-indigo-100 ml-4 mt-4 w-[20rem] rounded-xl overflow-hidden	">
      <h2 className="text-2xl font-bold bg-indigo-900 text-white py-2 px-6">
        Tema
      </h2>
      <div className="h-24 py-2 px-6 text-black text-2xl">{tema.descricao}</div>
      <div className="container flex justify-center items-stretch text-sm">

        <Link to={`/editarTema/${tema.id}`} className='hover:underline w-[50%]'>
          <button className="bg-indigo-300 w-[100%] py-2">Editar</button>
        </Link>
        <Link to={`/deletarTema/${tema.id}`} className='hover:underline w-[50%]'>
          <button className="bg-red-400 w-[100%] py-2">Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardTema