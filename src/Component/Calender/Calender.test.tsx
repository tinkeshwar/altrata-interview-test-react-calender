import { render } from '@testing-library/react';
import { Calender } from './Calender';

test('Render calender', () => {
  const { container } = render(<Calender date={new Date('01/01/2023')} className={'test-case-calender'}/>)
  expect(container).toMatchSnapshot()
})

test('Class name prop', () => {
  const { container } = render(<Calender date={new Date()} className={'test-case-calender'}/>)
  expect(container.firstElementChild).toHaveClass('test-case-calender')
})