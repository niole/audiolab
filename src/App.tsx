import * as React from 'react';
import './App.css';
import ParsedAudioView from './views/parsedaudio';
require('vis/dist/vis.css');

const App: React.FC = () => {
  return (
    <ParsedAudioView />
  );
}

export default App;
