import { useDispatch, useSelector } from "react-redux";
import { onCloseModal, onOpenModal } from "../../store";


export const useUiStore = () => {
    const dispatch = useDispatch();

    const {
        isDateModalOpen
    } = useSelector((state) => state.ui);

    const OpenDateModal = () => {
        dispatch(onOpenModal())
    }
    const CloseDateModal = () => {
        dispatch(onCloseModal())
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? OpenDateModal()
            : CloseDateModal()
    }

    return {
        //* Propiedades 
        isDateModalOpen,

        //! Metodos
        OpenDateModal,
        CloseDateModal,
        toggleDateModal
    }
}
