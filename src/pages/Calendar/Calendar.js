import { db } from '../../firebaseConfig'
import {
  // collection,
  // query,
  // getDocs,
  // addDoc,
  // orderBy,
  // limit,
  // Timestamp,
  // deleteDoc,
  doc,
} from 'firebase/firestore'
import React, { Component } from 'react'
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from '@daypilot/daypilot-lite-react'
import './Calendar.css'
import { setDoc, deleteDoc } from 'firebase/firestore'
import { auth } from '../../firebaseConfig'
import { fetchCalendar } from '../../components/services/calendarService'

const styles = {
  wrap: {
    display: 'flex',
  },
  left: {
    marginRight: '10px',
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
        }
        dp.events.add(event)

        await setDoc(doc(db, 'events', event.id), {
          start: `${event.start}`,
          end: `${event.end}`,
          id: `${event.id}`,
          text: `${event.text}`,
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
        console.log('DELETE EVENT!!!!', args)

        // Extract the ID to be deleted
        const { id, text, start, end, userID } = args.e.data
        // Call deleteDoc(....)
        await deleteDoc(doc(db, 'events', id), {
          start,
          end,
          text,
          userID,
        })
      },
      onEventMove: async args => {
        console.log('EVENT MOVED!!!!', args, args.e.data.id)

        const { id, text } = args.e.data // extract the ID from the given event data

        await setDoc(doc(db, 'events', id), {
          start: `${args.newStart}`,
          end: `${args.newEnd}`,
          text,
          userID: auth.currentUser.uid,
        })
      },
      onEventResize: async args => {
        console.log('EVENT RESIZED!!!!', args)

        const { id, text, userID } = args.e.data // extract the ID from the given event data

        await setDoc(doc(db, 'events', id), {
          start: `${args.newStart}`,
          end: `${args.newEnd}`,
          text,
          userID,
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
