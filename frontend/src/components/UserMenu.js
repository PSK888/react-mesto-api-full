const UserMenu = ({ email, handleLogout, isUserMenuOpen }) => {
    return (
      <div className={`menu ${isUserMenuOpen && "menu__open"}`}>
        <h2 className="menu__email">{email}</h2>
        <button className="menu__exit" type="button" onClick={handleLogout}>Выйти</button>
      </div>
    );
  };
  
  export default UserMenu;