import logo from './images/logo.svg';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm">
        <a href="https://www.digitalfutures.com" className="navbar-brand" target="_blank" rel="noreferrer">
          <img src={logo} alt="Digital Futures" width="100" />
        </a>
        <a href="/" className="navbar-brand">Todo App</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li>
              {/* NavLink here */}
            </li>
            <li>
              {/* NavLink here */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;