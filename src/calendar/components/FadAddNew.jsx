import { addHours } from "date-fns"
import { useCalendarStore, useUiStore } from "../../hooks"


export const FadAddNew = () => {

    const { OpenDateModal } = useUiStore()
    const { setActiveEvent } = useCalendarStore()

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: ' ',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColors: "#fafafa",
            user: {
                _id: "'123",
                name: 'Rudy'
            }
        })
        OpenDateModal()
    }
    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
