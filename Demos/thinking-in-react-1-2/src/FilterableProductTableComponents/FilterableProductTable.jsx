import { useState } from 'react';

import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

import products from '../sampleProducts.json';

const FilterableProductTable = () => {
    const [appLevelSearchState, setAppLevelSearchState] = useState(``);
    const [appLevelInStock, setAppLevelInStock] = useState(false);

    const updateAppLevelSearchState = searchText => setAppLevelSearchState(searchText);

    const updateAppLevelInStock = inStock => setAppLevelInStock(inStock);

    return (
        <>
            <SearchBar
                updateSearchText={updateAppLevelSearchState}
                updateInStock={updateAppLevelInStock}
            />
            <ProductTable products={products} searchText={appLevelSearchState} inStockOnly={appLevelInStock} />
        </>
    );
};

export default FilterableProductTable;
