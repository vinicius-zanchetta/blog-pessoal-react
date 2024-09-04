import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react"
import AuthContext from "../../contexts/AuthContext";
import { ReactNode, useContext } from "react";

function Footer() {

  const { usuario } = useContext(AuthContext)

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className=" bg-indigo-900 flex flex-col items-center color-white ">
      <span className="p-1 text-white">Blog Pessoal Generation - Copyright</span>
      <span className="p-1 text-white">Acesse nossas redes sociais:</span>
      <div className="flex p-2 text-white gap-2">
        <LinkedinLogo className="cursor-pointer" size={48} />
        <InstagramLogo className="cursor-pointer" size={48} />
        <FacebookLogo className="cursor-pointer" size={48} />
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

export default Footer