import './App.css';
import Store from './store/Store';
import { Provider } from 'react-redux';
import ProductForm from './Components/ProductForm';
import Form from './Components/Form';


const App = () => {

  return (
    <div className="App">
      <Provider store={Store}>
        <ProductForm />
        {/* <Form /> */}
      </Provider>
    </div>
  );
}

export default App;
