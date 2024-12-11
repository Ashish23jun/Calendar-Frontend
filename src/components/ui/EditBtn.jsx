import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";

const EditEventBtn = () => {
  const dispatch = useDispatch();
  const { activeEvent } = useSelector((state) => state.calendar); // Get the active event.

  const handleClickEdit = () => {
    if (!activeEvent) {
      // If no event is selected, show a warning.
      Swal.fire(
        "No event selected",
        "Please select an event to edit.",
        "warning"
      );
      return;
    }

    // Open the modal with the selected event's details.
    dispatch(uiOpenModal());
  };

  return (
    <button
    className="btn btn-primary btn--floating btn--floating-edit"
    onClick={handleClickEdit}
    >
      <CiEdit />
    </button>
  );
};

export default EditEventBtn;
