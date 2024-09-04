import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import Postagem from '../../../models/Postagem'
import { buscar, deletar } from '../../../services/Service'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function DeletarPostagem() {
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                ToastAlerta('O token expirou, favor logar novamente', 'info')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'erro');
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/postagens")
    }

    async function deletarPostagem() {
        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Postagem apagado com sucesso', 'sucesso')

        } catch (error) {
            ToastAlerta('Erro ao apagar o Postagem', 'erro')
        }

        retornar()
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <span className='my-8 font-bold'>Você tem certeza que deseja apagar o postagem a seguir?</span>
            <div className="text-white container bg-indigo-100 ml-4 w-[28rem] rounded-xl overflow-hidden	">
                <h2 className="text-2xl 
                        font-bold 
                        bg-indigo-900 
                        text-white py-2 px-6">{postagem.titulo}</h2>
                <div className="py-2 px-6 text-black text-2xl">{postagem.texto}</div>
                <div className="container flex justify-center items-stretch text-sm">
                    <button className="bg-indigo-300 w-[50%] py-2"  onClick={retornar}>
                        Não
                    </button>
                    <button className="bg-red-400 w-[50%] py-2" onClick={deletarPostagem}>
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem