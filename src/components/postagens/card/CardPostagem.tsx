import { Link } from "react-router-dom"
import Postagem from "../../../models/Postagem"

interface CardPostagemProps {
  postagem: Postagem
}

function formateDate(data: string): string {

  let dataFormatada = data.substring(0, 10).split("-");
  return (`${dataFormatada[2]}/${dataFormatada[1]}/${dataFormatada[0]}`)
}

function CardTema({ postagem }: CardPostagemProps) {
  return (
    <div
      className="
        text-white 
        rounded
        flex flex-col">
      <h2 className="
        text-2xl 
        font-bold 
        bg-indigo-900 
        text-white 
        py-2 px-4">
        {postagem.titulo}
      </h2>
      <div className="pb-2 px-4 text-white text-sm bg-indigo-900">
        {postagem.tema?.descricao}
      </div>
      <div className="min-h-36 py-2 px-4 text-black text-xl bg-gray-200">
        {postagem.texto}
      </div>
      <div className="pb-3 px-6 w-full text-black text-end bg-gray-200">
        {formateDate(postagem.data)}
      </div>

      <div className="container flex justify-center items-stretch text-sm">
        <Link to={`/editarPostagem/${postagem.id}`} className='hover:underline w-[50%]'>
          <button className="bg-indigo-300 w-[100%] py-2">Editar</button>
        </Link>
        <Link to={`/deletarPostagem/${postagem.id}`} className='hover:underline w-[50%]'>
          <button className="bg-red-400 w-[100%] py-2">Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardTema