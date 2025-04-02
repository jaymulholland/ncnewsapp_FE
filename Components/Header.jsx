import { Link } from "react-router";

const Header = () => {
    return (
      <div className="header-container">
        
        <div className="bodyColoured">
          <div className="h1-logo">NC_NEWS</div>
         
          <div className="header-wide-gradient">
        <div className="header-buttons">
          < Link to="/Home"><button>Home</button></Link>
          < Link to="/api/articles"><button>All Articles</button></Link>
          < Link to="/api/Topics"><button >Topics</button></Link>
        </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default Header;