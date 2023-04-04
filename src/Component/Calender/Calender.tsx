import classNames from "classnames"
import { forwardRef } from "react"

interface CalenderProps {
  className?: string
  date: Date
}

interface DayObjectInterface {
  day: number
  narrow: string
  short: string
  long: string
}

interface DaysObjectInterface {
  type: string
  date: number
}

export const Calender = forwardRef<HTMLDivElement, CalenderProps>((
  {
    date, 
    className
  },
  ref
) => {

  // To check whether valid date object is recieved or not.
  if(Object.prototype.toString.call(date) !== "[object Date]"){
    console.error('Not a valid date object passed to calender component.')
    return <></>
  }

  const _classname: string = classNames(
    'custom-calender-class', // to customise component globally
    className
  )

  const month: string = date.toLocaleString('default', { month: 'long' })
  const year: number = date.getFullYear()

  return (
    <div ref={ref} className={_classname}>
      <div className={'row border'}>
        <div className={'col-12 text-center border-bottom fs-3'}>{month} {year}</div>
        <div className={'row gx-0'}>
          <GetMonthHeader/>
        </div>
        <GetWeekRows date={date}/>
      </div>
    </div>
  )
})


// generate header for calender.
const GetMonthHeader = ({header='narrow'}:{header?: 'narrow'|'short'|'long'}) => {
  const dayObject: DayObjectInterface[]  = [
    {day: 1, narrow: 'Su', short: 'Sun', long: 'Sunday'},
    {day: 2, narrow: 'Mo', short: 'Mon', long: 'Monday'},
    {day: 3, narrow: 'Tu', short: 'Tue', long: 'Tuesday'},
    {day: 4, narrow: 'We', short: 'Wed', long: 'Wednesday'},
    {day: 5, narrow: 'Th', short: 'Thu', long: 'Thursday'},
    {day: 6, narrow: 'Fr', short: 'Fri', long: 'Friday'},
    {day: 7, narrow: 'Sa', short: 'Sat', long: 'Saturday'},
  ]
  return <>{dayObject && dayObject.map((day: DayObjectInterface, index: number) => <div key={`days-${index}`} className={'text-center bg-dark text-white col border fw-bold'}>{day[header]}</div>)}</>
}

// generate calender rows
const GetWeekRows = ({date}:{date: Date}) => {
  const day: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today: number = Number(new Date(date).toLocaleDateString('default', { day: 'numeric'}))
  const firstDay: number = day.indexOf(new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString('default', { weekday: 'short' }))+1
  const lastDay: number = Number(new Date(date.getFullYear(), date.getMonth()+1, 0).toLocaleString('default', { day: 'numeric' }))
  const lastMonthLastDay: number = Number(new Date(date.getFullYear(), date.getMonth(), 0).toLocaleString('default', { day: 'numeric' }))
  const weeks: number[] = [1, 2, 3, 4, 5, 6]

  // generate days array for a month
  const days = (): DaysObjectInterface[] => {
    const total: DaysObjectInterface[] = []
    for(let i = (lastMonthLastDay-(firstDay-2)); i<=lastMonthLastDay; i++) total.push({type: 'past', date: i})
    for(let i = 1; i<=lastDay; i++) total.push({type: 'current', date: i})
    const totalLength= total.length
    for(let i = 1; i<=42-totalLength; i++) total.push({type: 'future', date: i})
    return total
  }
  
  return <>{weeks.map((week: number, index: number) => <div key={`week-${index}`} className={'row gx-0'}><GetWeekRow week={week} days={days()} today={today}/></div>)}</>
}


// generate calender row
const GetWeekRow = ({week, days, today}: {week: number, days: DaysObjectInterface[], today: number}) => {
  const weekDays = (): DaysObjectInterface[] => {
    return days.slice((7*(week-1)), 7*(week))
  }

  const classname = (week: number, day: DaysObjectInterface, today: number): string =>{
    return classNames(
      'text-center',
      'col',
      'border',
      (['past', 'future'].includes(day.type)) && 'bg-light text-white',
      (day.date === today && day.type === 'current') && 'bg-primary text-white'
    )
  }

  return <> {weekDays().map((day: DaysObjectInterface, index: number) => <div key={`day-${index}`} className={classname(week, day, today)}>{day.date}</div>)}</>
}