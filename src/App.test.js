import { create } from 'react-test-renderer';
import App from './App';

describe('<App />', () => {
  it('Render correct', () => {
    const component = create(<App />);
    expect(component).toBeDefined();
  })
});