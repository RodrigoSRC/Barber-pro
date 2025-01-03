import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';

const Header = () => {
    return (
      <header className="container-fluid d-flex justify-content-end">
        <div className="d-flex align-items-center">
          <div>
            <span className="d-block m-0 p-0 text-white">Brabo do Corte</span>
            <small className="m-0 p-0">Plano Gold</small>
          </div>
          <img src="https://conteudo.imguol.com.br/c/entretenimento/d5/2020/10/07/homem-com-vergonha-1602098705397_v2_450x450.jpg" />
          <Icon path={mdiChevronDown} size={1} color="white"/>
        </div>
      </header>
    );
  };
  
  export default Header;