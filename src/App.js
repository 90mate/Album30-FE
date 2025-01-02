import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          💙 우리의 첫 React 프로젝트 💙
        </p>
        <Button variant="primary">부트스트랩 버튼 테스트</Button>{' '}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
