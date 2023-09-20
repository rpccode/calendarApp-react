import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';
registerLocale('es', es)
import "react-datepicker/dist/react-datepicker.css";
import { useMemo } from 'react';
import { useCalendarStore, useUiStore } from '../../hooks';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overlay: {
            zIndex: 4,
        }
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { activeEvent, startSavingEvent } = useCalendarStore()
    const { isDateModalOpen, CloseDateModal } = useUiStore()
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    });


    const titleClasss = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid';

    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent]);


    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value

        })
    }
    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event

        })
    }
    const onSumit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true)

        const difference = differenceInSeconds(formValues.end, formValues.start)

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas Incorrectas', 'Revisar las fechas Ingresadas', 'error');
            return;
        }
        if (formValues.title.length <= 0) return

        // console.log(formValues)
        await startSavingEvent(formValues);
        CloseDateModal()
        setFormSubmitted(false)

    }

    function onCloseModal() {
        // setIsOpen(false);
        CloseDateModal();
    }
    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSumit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>

                    <DatePicker
                        locale='es'
                        selected={formValues.start}
                        onChange={(event) => onDateChanged(event, 'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        locale='es'
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onDateChanged(event, 'end')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control  ${titleClasss}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}


                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
