import { Link } from "react-router";

const Header = () => {
    return (
      <div className="header-container">
        
        <div className="bodyColoured">
          <h1>NC_NEWS</h1>
        <div className="header-buttons">
          < Link to="/Home"><button>Home</button></Link>
          < Link to="/api/articles"><button>All Articles</button></Link>
          < Link to="/api/Topics"><button >Topics</button></Link>
        </div>
      </div>
      </div>
    );
  };
  
  export default Header;