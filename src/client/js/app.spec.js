require('regenerator-runtime');
import { diffDays } from './countdown.js';
describe('test day difference function', () => {
  // test stuff
  test('function to be defined', () => {
    expect(diffDays()).toBeDefined();
  });

  test('day difference between two days date', () => {
    let date1 = '04/10/2020';
    let date2 = '04/12/2020';

    expect(diffDays(date1, date2)).toBe(2);
  });
});
