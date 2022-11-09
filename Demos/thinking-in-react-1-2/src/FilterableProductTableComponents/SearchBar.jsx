import { useState } from "react";

const SearchBar = ({ updateSearchText, updateInStock }) => {

    const [search, setSearch] = useState(``);
    const [inStock, setInStock] = useState(false);

    const handleSearchTextChange = newText => {
        setSearch(newText);
        updateSearchText(newText);
    }

    const handleInStockChange = newStatus => {
        setInStock(newStatus);
        updateInStock(newStatus);
    }

    return (
        <form>
            {/* <input type="search" name="search" value={search} onChange={e => setSearch(e.target.value)} /> */}
            <input type="search" name="search" value={search} onChange={e => handleSearchTextChange(e.target.value)} />
            <br />
            {/* <input type="checkbox" name="inStock" checked={inStock} onChange={e => setInStock(e.target.checked)} /> */}
            <input type="checkbox" name="inStock" checked={inStock} onChange={e => handleInStockChange(e.target.checked)} />
            <label htmlFor="inStock">&nbsp;Only show products in stock</label>
        </form>
    );
};

export default SearchBar;
