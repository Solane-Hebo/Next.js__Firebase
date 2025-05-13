import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserInfoForm } from "./user-info-form";
import { ProfileImageUploader } from "./profile-image-uploader";
import { ChangePasswordForm } from "./change-pasword-form";

export default function SettingsForm( { user, isOwn }) {
  return (
  
   <div className="flex flex-col justify-between gap-10 lg:flex-row">

     <div className="w-full space-y-10">
        {
          isOwn && (
            <div className="flex items-center justify-between lg:justify-stretch gap-10">
                <p className="font-semibold text-lg">Färgtema</p>
                <ModeToggle />
            </div>
        )
    }

     <div className="flex items-center justify-between lg:justify-stretch gap-10">
         <p className="font-semibold text-lg">Kortfärg</p>
         {/* TODO: KORTFÄRG */}
     </div>
       <UserInfoForm user={user} />

     <div className="flex justify-between lg:justify-stretch gap-10">
         <p className="font-semibold text-lg">Profibild:</p>
         <ProfileImageUploader />
        
     </div>
   
   </div>
     {
     isOwn && (
       
            <ChangePasswordForm  className="w-full"/>
     )
     }
   </div>
   
  )
}
