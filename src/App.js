import './App.css';
import Routes from './Routes';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux'
import store from "./store"

function App() {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
    
  );
}

export default App;
