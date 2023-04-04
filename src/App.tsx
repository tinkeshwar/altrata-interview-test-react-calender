import React from 'react';
import { Calender } from './Component';

const App = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setDate(new Date(event.currentTarget.value))
  }

  const [date, setDate] = React.useState<Date>(new Date())

  return (
    <div className={'container mt-5'}>
      <div className={'row'}>
        <div className={'col-4'}>
          <div className={'mb-3'}>
            <label htmlFor={'dateinput'} className={'form-label'}>Date Input</label>
            <input type={'date'} name={'datein'} className={'form-control'} id={'dateinput'} onChange={handleChange}/>
          </div>
        </div>
        <div className={'col-8'}>
          <Calender date={date}/>
        </div>
      </div>
    </div>
  );
}

export default App;
