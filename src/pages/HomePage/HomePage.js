import React, { useEffect } from 'react';
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import ProductList from "../../components/ProductList/ProductList";
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import Loader from "../../components/Loader/Loader";
import { STATUS } from '../../utils/status';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, [dispatch]); // ✅ Fixed ESLint warning

  // Randomizing products
  const tempProducts = [];
  if (products.length > 0) {
    const usedIndexes = new Set();
    while (tempProducts.length < products.length) {
      const randomIndex = Math.floor(Math.random() * products.length);
      if (!usedIndexes.has(randomIndex)) {
        tempProducts.push(products[randomIndex]);
        usedIndexes.add(randomIndex);
      }
    }
  }

  // Prevent errors if categories haven't loaded yet
  let catProductsOne = [], catProductsTwo = [], catProductsThree = [], catProductsFour = [];

  if (categories.length >= 4) {
    catProductsOne = products.filter(product => product.category === categories[0]);
    catProductsTwo = products.filter(product => product.category === categories[1]);
    catProductsThree = products.filter(product => product.category === categories[2]);
    catProductsFour = products.filter(product => product.category === categories[3]);
  }

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={tempProducts} />}
            </div>

            {categories.length >= 4 && (
              <>
                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[0]}</h3>
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
                </div>

                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[1]}</h3>
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
                </div>

                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[2]}</h3>
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
                </div>

                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[3]}</h3>
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsFour} />}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
