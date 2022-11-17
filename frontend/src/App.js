// import { toast, ToastContainer, Zoom } from 'react-toastify';
// i
import '../src/App.css';
import Index from './components/Index';
import { ToastContainer } from './components/DeskToast';
function App() {
  return (
    <div className='mx-auto max-w-5xl'>
      <ToastContainer />
      <Index />
    </div>
  );
}

export default App;
