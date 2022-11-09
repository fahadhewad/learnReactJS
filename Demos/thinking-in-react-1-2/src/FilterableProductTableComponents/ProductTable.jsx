import CategoryRow from './CategoryRow';
import ProductRow from './ProductRow';

const ProductTable = ({ products }) => {

    let tableRows = [];
    let lastCategory = ``;

    const sortedProducts = products;
    sortedProducts.sort((prod1, prod2) => {
        if (prod1.category < prod2.category) return 1;
        if (prod1.category > prod2.category) return -1;
        return 0;
    })

    products?.forEach(product => {
        if (product.category !== lastCategory) {
            lastCategory = product.category;
            tableRows.push(<CategoryRow key={lastCategory} category={product.category} />);
        }
        tableRows.push(<ProductRow key={product.id} product={product} />);
    });

    // const productRows = products.map(product => (
    //     <ProductRow key={product.id} product={product} />
    // ));

    return (
        <table>
            <tbody>
                {/* {productRows} */}
                {tableRows.length > 0 ? tableRows : <tr><td colSpan="2">No Products Found</td></tr>}
            </tbody>
        </table>
    );
};

export default ProductTable;
