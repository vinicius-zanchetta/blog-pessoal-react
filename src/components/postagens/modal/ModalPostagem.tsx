import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ModalPostagem.css'

import FormularioPostagem from '../form/FormularioPostagem';

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <button>
                        Nova Postagem
                    </button>
                }
                modal
            >
                <FormularioPostagem />
            </Popup>
        </>
    );
}

export default ModalPostagem;