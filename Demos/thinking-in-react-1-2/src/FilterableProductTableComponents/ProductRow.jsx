import './ProductRow.css';

const ProductRow = ({ product }) => {
    const { name, price, stocked } = product;
    return (
        <tr>
            <td className={!stocked ? `outOfStock` : ``}>{name}</td>
            <td>{price}</td>
        </tr>
    );
};

export default ProductRow;
