import { db } from '../../firebaseConfig'
import { doc } from 'firebase/firestore'
import React, { Component } from 'react'
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from '@daypilot/daypilot-lite-react'
import './Calendar.css'
import { setDoc } from 'firebase/firestore'
import { auth } from '../../firebaseConfig'
import { deleteCalendarEvent, fetchCalendar } from '../../components/services/calendarService'
import randomColor from 'randomcolor'

const styles = {
  wrap: {
    display: 'flex',
  },
  left: {
    marginRight: '10px',
    marginLeft: '1%',
  },
  main: {
    flexGrow: '1',
  },
}

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.calendarRef = React.createRef()
    this.state = {
      mounted: false,
      loaded: false,
      events: [],
      viewType: 'Week',
      durationBarVisible: false,
      timeRangeSelectedHandling: 'Enabled',
      onTimeRangeSelected: async args => {
        const dp = this.calendar
        const modal = await DayPilot.Modal.prompt('Create a new event:', 'Event name')
        dp.clearSelection()
        if (!modal.result) {
          return
        }
        const event = {
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result,
          backColor: randomColor(),
        }
        dp.events.add(event)

        await setDoc(doc(db, 'events', event.id), {
          start: `${event.start}`,
          end: `${event.end}`,
          id: `${event.id}`,
          text: `${event.text}`,
          backColor: `${event.backColor}`,
          userID: auth.currentUser.uid,
        })
      },
      eventDeleteHandling: 'Update',
      onEventClick: async args => {
        const dp = this.calendar
        const modal = await DayPilot.Modal.prompt('Update event text:', args.e.text())
        if (!modal.result) {
          return
        }
        const e = args.e
        e.data.text = modal.result
        dp.events.update(e)
      },
      onEventDelete: async args => {
        // Extract the ID to be deleted
        const { id } = args.e.data
        await deleteCalendarEvent(id)
      },
      onEventMove: async args => {
        console.log('EVENT MOVED!!!!', args, args.e.data.id)

        const { id, text, backColor } = args.e.data // extract the ID from the given event data

        await setDoc(doc(db, 'events', id), {
          start: `${args.newStart}`,
          end: `${args.newEnd}`,
          text,
          backColor,
          userID: auth.currentUser.uid,
        })
      },
      onEventResize: async args => {
        console.log('EVENT RESIZED!!!!', args)

        const { id, text, backColor } = args.e.data // extract the ID from the given event data

        await setDoc(doc(db, 'events', id), {
          start: `${args.newStart}`,
          end: `${args.newEnd}`,
          text,
          backColor,
          userID: auth.currentUser.uid,
        })
      },
    }
  }

  get calendar() {
    return this.calendarRef.current.control
  }

  async componentDidMount() {
    console.log('CDM START')

    this.setState({ mounted: true })
    console.log('CDM END')
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log('CDU START')
    const startDate = '2023-03-07'

    if (this.state.loaded === false) {
      console.log('LOADED IS FALSE, so FETCHING CALENDAR EVENTS...')
      fetchCalendar().then(response => {
        console.log('FETCH EVENTS RESPONSE: ', JSON.stringify(response, null, 2))

        this.calendar.update({ startDate, events: response })
      })
    }

    console.log('CDU END')
  }

  render() {
    console.log('RENDER > STATE EVENTS: ', this.state.events)
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={'week'}
            showMonths={3}
            skipMonths={3}
            startDate={'2023-03-07'}
            selectionDay={'2023-03-07'}
            onTimeRangeSelected={args => {
              this.calendar.update({
                startDate: args.day,
              })
            }}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar {...this.state} ref={this.calendarRef} />
        </div>
      </div>
    )
  }
}

export default Calendar
