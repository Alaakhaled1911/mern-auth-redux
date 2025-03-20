import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
    
        <Outlet />
     
    </>
  );
};

export default App;