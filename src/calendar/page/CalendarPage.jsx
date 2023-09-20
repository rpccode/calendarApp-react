import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import { CalendarEvent, CalendarModal, FabDelecte, FadAddNew, NavBar } from "../components"
import { localizer, getMessages } from '../../helpers'
import { useCalendarStore, useUiStore } from '../../hooks'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export const CalendarPage = () => {

    const { events, setActiveEvent } = useCalendarStore()
    const { OpenDateModal } = useUiStore()
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log({ event, start, end, isSelected })

        const style = {
            backgrounColor: '#347cf7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleCLick = (event) => {
        // console.log({ DoubleClick: event });
        OpenDateModal()
    }

    const onSelectCLick = (event) => {
        // console.log({ Click: event });
        setActiveEvent(event)
    }

    const onViewChanged = (event) => {
        // console.log({ ViewChanged: event })
        localStorage.setItem('lastView', event);
        setLastView(event)

    }
    return (
        <>
            <NavBar />
            <div className=''>
                <Calendar
                    culture='es'
                    messages={getMessages()}
                    localizer={localizer}
                    events={events}
                    defaultView={lastView}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 'calc( 100vh - 80px )' }}
                    eventPropGetter={eventStyleGetter}
                    components={{
                        event: CalendarEvent
                    }}
                    onDoubleClickEvent={onDoubleCLick}
                    onSelectEvent={onSelectCLick}
                    onView={onViewChanged}
                />

            </div>
            <FadAddNew />
            <FabDelecte />
            <CalendarModal />
        </>
    )
}
