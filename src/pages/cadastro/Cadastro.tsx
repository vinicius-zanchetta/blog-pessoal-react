import { ChangeEvent, FormEvent, useState } from 'react';
import imagemCadastro from '../../assets/cadastro.jpg';
import Usuario from '../../models/Usuario';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { ToastAlerta } from '../../utils/ToastAlerta';

function Cadastro() {

  const navigate = useNavigate();

  function retornar() {
    navigate('/login')
  }

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  })

  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true)

      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario)
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário", 'erro')
      }
    } else {
      ToastAlerta("Dados inconsistentes! Verifique as informações do Cadastro.", 'info')
      setUsuario({ ...usuario, senha: "" })
      setConfirmaSenha("");
    }

    setIsLoading(false);
  }



  return (
    <div className="h-screen grid grid-cols-2">
      <div className="img-section overflow-hidden object-fill h-[100%]">
        <img src={imagemCadastro} className='object-fill' alt="" />
      </div>
      <div className="input-section flex flex-col justify-center items-center">
        <h2 className='text-4xl font-bold'>Cadastrar</h2>
        <form
          className="flex flex-col w-[80%]"
          onSubmit={cadastrarNovoUsuario}>
          <label htmlFor="" className='font-bold pt-2'>Nome</label>
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder='Nome'
            value={usuario.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className='border-2 border-black rounded py-1 px-3' />
          <label htmlFor="" className='font-bold pt-2'>Usuário</label>
          <input
            type="text"
            name="usuario"
            id="usuario"
            placeholder='Usuário'
            value={usuario.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className='border-2 border-black rounded py-1 px-3' />
          <label htmlFor="" className='font-bold pt-2'>Foto</label>
          <input
            type="text"
            name="foto"
            id="foto"
            placeholder='Foto'
            value={usuario.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className='border-2 border-black rounded py-1 px-3' />
          <label htmlFor="" className='font-bold pt-2'>Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder='Senha'
            value={usuario.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className='border-2 border-black rounded py-1 px-3' />
          <label htmlFor="" className='font-bold pt-2'>Confirmar Senha</label>
          <input
            type="password"
            name="confirmarSenha"
            id="confirmarSenha"
            placeholder='Confirmar Senha'
            value={confirmaSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            className='border-2 border-black rounded py-1 px-3' />
          <div className="buttons flex flex-row pt-4 gap-[4%]">
            <button 
            onClick={retornar}
            className='w-[48%] p-2 bg-red-400'>Cancelar</button>
            <button type="submit" className='w-[48%] bg-indigo-400 flex justify-center items-center font-bold'>
              {isLoading ?
                <RotatingLines
                  strokeColor="white" 
                  strokeWidth="5" 
                  animationDuration="0.75" 
                  width="24" 
                  visible={true} /> : <span>Cadastrar</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Cadastro