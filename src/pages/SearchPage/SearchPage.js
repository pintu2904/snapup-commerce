import React, { useEffect } from 'react';
import "./SearchPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import ProductList from '../../components/ProductList/ProductList';
import { fetchAsyncSearchProduct, getSearchProducts, getSearchProductsStatus, clearSearch } from '../../store/searchSlice';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const searchProducts = useSelector(getSearchProducts);
  const searchProductsStatus = useSelector(getSearchProductsStatus);

  useEffect(() => {
    // Only clear the search results if the search term changes
    dispatch(clearSearch());
    dispatch(fetchAsyncSearchProduct(searchTerm));
  }, [dispatch, searchTerm]);

  // Handle different loading states
  if (searchProductsStatus === STATUS.LOADING) {
    return <Loader />;
  }

  // Handle no products found
  if (searchProducts.length === 0) {
    return (
      <div className='container' style={{ minHeight: "70vh" }}>
        <div className='fw-5 text-danger py-5'>
          <h3>No Products found.</h3>
        </div>
      </div>
    );
  }

  // Handle error state
  if (searchProductsStatus === STATUS.ERROR) {
    return (
      <div className='container' style={{ minHeight: "70vh" }}>
        <div className='fw-5 text-danger py-5'>
          <h3>Something went wrong. Please try again later.</h3>
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className='search-content bg-whitesmoke'>
        <div className='container'>
          <div className='py-5'>
            <div className='title-md'>
              <h3>Search results:</h3>
            </div>
            <br />
            <ProductList products={searchProducts} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
