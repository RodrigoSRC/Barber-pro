import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './style.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Agendamentos from './pages/Agendamentos';
import Clientes from './pages/Clientes';
import Colaboradores from './pages/Colaboradores';
import Servicos from './pages/Servicos';
import Horarios from './pages/Horarios';

const RoutesMain = () => {
  return (
    <Router>
      <Header />
      <div className="container-fluid h-100">
        <div className="row h-100">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Agendamentos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/colaboradores" element={<Colaboradores />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/horarios" element={<Horarios />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default RoutesMain;