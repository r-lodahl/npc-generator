import React from 'react';
import './App.css';
import * as NameGenerator from './util/name-generator/name-generator';
import { names } from './util/name-generator/german-medieval-male-names';
import {Generator} from "./component/generator-selection/generator";


function App() {
  return (
    <div className="App">
      {NameGenerator.generate_name('german-male-medieval', names)}
        <Generator />
    </div>
  );
}

export default App;
