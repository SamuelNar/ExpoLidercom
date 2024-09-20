import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li style={{color: 'black'}}><Link to="/">Presentación</Link></li>
      <li style={{color: 'black'}}><Link to="/roulette">Ruleta</Link></li>
      <li style={{color: 'black'}}><Link to="/trivia">Trivia</Link></li>
    </ul>
  </nav>
);

export default Navigation;
