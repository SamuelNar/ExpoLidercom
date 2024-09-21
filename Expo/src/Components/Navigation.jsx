import { Link } from 'react-router-dom';
import '../Style/Navigation.css';
const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/">Presentación</Link></li>
      <li><Link to="/roulette">Ruleta</Link></li>
      <li><Link to="/trivia">Trivia</Link></li>
    </ul>
  </nav>
);

export default Navigation;
