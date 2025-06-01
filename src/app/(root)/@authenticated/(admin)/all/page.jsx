import { Header } from "@/components/header"
import { AllUsersTaskList } from "./_component/all-users-tasks-list"

function AllTasksPage() {
  return (
    <> 
    <Header />
    <div className="flex gap-4 mt-10 overflow-x-auto pb-20 ">
      <AllUsersTaskList />
    </div>
    </>
  )
}

export default AllTasksPage