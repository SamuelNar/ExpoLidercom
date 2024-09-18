import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/">Presentación</Link></li>
      <li><Link to="/roulette">Ruleta</Link></li>
    </ul>
  </nav>
);

export default Navigation;
