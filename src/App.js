import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

// Pages
import { Home, CategoryProduct, ProductSingle, Cart, Search } from './pages/index';

// Components
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary>
            <Header />
            {/* <Sidebar /> */}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductSingle />} />
              <Route path="/category/:category" element={<CategoryProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>

            <Footer />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
