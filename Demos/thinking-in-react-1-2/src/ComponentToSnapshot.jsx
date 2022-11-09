import PropTypes from 'prop-types';

const ComponentToSnapshot = ({ title, linkText, number }) => {

    return (
        <header>
            <h1>{title}</h1>
            <a href="https://www.bbc.co.uk">{linkText}</a>
            <p>How many years ago was it when Sgt Pepper told the band to play? {number}</p>
        </header>
    );
};

export default ComponentToSnapshot;

ComponentToSnapshot.defaultProps = {
    title: `Title from default props`,
    linkText: `Link from default props`,
}

ComponentToSnapshot.propTypes = {
    title: PropTypes.string,
    linkText: PropTypes.string,
    number: PropTypes.number.isRequired,
}
