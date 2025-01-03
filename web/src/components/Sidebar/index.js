import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Icon from '@mdi/react';
import { mdiAccountMultiple, mdiAutoFix, mdiCalendarCheck, mdiCardAccountDetailsOutline, mdiClockCheckOutline } from '@mdi/js';



const Sidebar = () => {
  const location = useLocation();

  return (
    <sidebar className="col-2 h-100">
      <img src={logo} className="img-fluid px-3 py-4" alt="Logo" />
      <ul>
        <li>
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
          >
            <Icon path={mdiCalendarCheck} size={1} className='mdi'/>
            <text>Agendamentos</text>
          </Link>
        </li>
        <li>
          <Link
            to="/clientes"
            className={location.pathname === '/clientes' ? 'active' : ''}
          >
            <Icon path={mdiAccountMultiple} size={1} className='mdi'/>
            <text>Clientes</text>
          </Link>
        </li>
        <li>
          <Link
            to="/colaboradores"
            className={
              location.pathname === '/colaboradores' ? 'active' : ''
            }
          >
            <Icon path={mdiCardAccountDetailsOutline} size={1} className='mdi'/>
            <text>Colaboradores</text>
          </Link>
        </li>
        <li>
          <Link
            to="/servicos"
            className={
              location.pathname === '/servicos' ? 'active' : ''
            }
          >
            <Icon path={mdiAutoFix} size={1} className='mdi'/>
            <text>Serviços</text>
          </Link>
        </li>
        <li>
          <Link
            to="/horarios"
            className={
              location.pathname === '/horarios'
                ? 'active'
                : ''
            }
          >
            <Icon path={mdiClockCheckOutline} size={1} className='mdi'/>
            <text>Horarios</text>
          </Link>
        </li>
      </ul>
    </sidebar>
  );
};

export default Sidebar;



// import { Link } from 'react-router-dom';
// import logo from '../../assets/logo.png';
// import util from '../../util';

// const Sidebar = (props) => {
//   return (
//     <sidebar className="col-2 h-100">
//       <img src={logo} class="img-fluid px-3 py-4" />
//       <ul>
//         <li>
//           <Link
//             to="/"
//             className={props.location.pathname === '/' ? 'active' : ''}
//           >
//             <span className="mdi mdi-calendar-check"></span>
//             <text>Agendamentos</text>
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/clientes"
//             className={props.location.pathname === '/clientes' ? 'active' : ''}
//           >
//             <span className="mdi mdi-account-multiple"></span>
//             <text>Clientes</text>
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/colaboradores"
//             className={
//               props.location.pathname === '/colaboradores' ? 'active' : ''
//             }
//           >
//             <span className="mdi mdi-card-account-details-outline"></span>
//             <text>Colaboradores</text>
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/servicos-produtos"
//             className={
//               props.location.pathname === '/servicos-produtos' ? 'active' : ''
//             }
//           >
//             <span className="mdi mdi-auto-fix"></span>
//             <text>Serviços</text>
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/horarios-atendimento"
//             className={
//               props.location.pathname === '/horarios-atendimento'
//                 ? 'active'
//                 : ''
//             }
//           >
//             <span className="mdi mdi-clock-check-outline"></span>
//             <text>Horarios</text>
//           </Link>
//         </li>
//       </ul>
//     </sidebar>
//   );
// };

// export default util.withRouter(Sidebar);