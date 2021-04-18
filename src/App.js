import './App.css';
import TimeStamp from './Components/TimeStamp'

function App() {
  return (
    <div className="App">
      <div className="timestamp-container">
        <TimeStamp></TimeStamp>
        <TimeStamp></TimeStamp>
      </div>
      <div className="timestamp-container">
        <TimeStamp></TimeStamp>
        <TimeStamp></TimeStamp>
      </div>
    </div>
  );
}

export default App;
