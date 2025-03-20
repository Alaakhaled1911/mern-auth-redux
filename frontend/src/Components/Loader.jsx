import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return <Spinner animation="border" 
  role="status"
  style={
    {
      width: '50px',
      height: '50px',
      margin: '22px auto',
      display: 'block',
    }
  }
  />;
}

export default Loader;