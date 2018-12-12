import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//React Utilities https://reactjs.org/docs/test-utils.html
import ReactTestUtils from 'react-dom/test-utils';
//Shallow Render  https://reactjs.org/docs/shallow-renderer.html
import ShallowRenderer from 'react-test-renderer/shallow';
//Test REnderer https://jestjs.io/docs/en/tutorial-react
import renderer from 'react-test-renderer'

import UtilF from './util';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Prueba de div',()=>{
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe('div');
});
it('Debe Fallar',()=>{
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe('p');
});
test('Trivial Value',()=>{
  expect(1).toBe(1)
});
test('Archivo Externo',()=>{
  expect(UtilF.fairDice()).toBe(4);
});
test('Archivo Externo Fallo',()=>{
  expect(UtilF.fairDice()).toBe(6);
});

test('Archivo Externo String',()=>{
  expect(UtilF.randomString()).toBe("asdadsad");
});
test('Archivo Externo String Fallo',()=>{
  expect(UtilF.randomString()).toBe("Ok");
});