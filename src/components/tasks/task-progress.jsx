import { cn } from "@/lib/utils"
import { Progress} from "../ui/progress"
import { TaskSettingDialog } from "./task-setting-dialog"

export const TaskProgress = ({ total = 0, completed = 0, className, user, accentColor}) => {
  
    const progress = (completed / total) * 100

    return (

    <div className={cn("", className)}>
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">{user.userName}</h2>
           <TaskSettingDialog user={user}/>
        </div>
        <div className="flex items-center justify-between">
            <span>{completed} / {total}</span>
            <span>{isNaN(progress.toFixed(0)) ? 0 : progress.toFixed(0)}%</span>
        </div>
        <Progress
            accentColor={accentColor}
            value={progress}
            className="w-full h-4 bg-background/20 rounded-lg"
        />
    </div>
    )
  
}
