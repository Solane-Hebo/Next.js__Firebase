import { DialogTitle } from "@radix-ui/react-dialog"
import { AddTaskForm } from "../../../add/_components/add-task-form"
import { Modal } from "./_components/modal"


function AddFormModalPage() {
  return (
   <Modal >
    <DialogTitle className="p-3 text-center text-xl">Lägg till uppgift</DialogTitle>
    <AddTaskForm isModal/>
   </Modal>
  )
}

export default AddFormModalPage