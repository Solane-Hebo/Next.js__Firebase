
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserInfoForm } from "./user-info-form";
import { ProfileImageUploader } from "./profile-image-uploader";
import { ChangePasswordForm } from "./change-pasword-form";
import { ColorPicker } from "./color-picker";
import { useAuth } from "@/context/authContext";
import { UserRolesManager } from "./user-roles-manager";

export default function SettingsForm( { user, isOwn }) {
   const { isAdmin} = useAuth()
  return (
  <>
   <div className="flex flex-col justify-between gap-10 lg:flex-row">
    <div className="w-full space-y-10">
       {
        isOwn && (
         <div className="flex items-center justify-between lg:justify-stretch gap-10">
          <p className="font-semibold text-lg">Färgtema</p>
             <ModeToggle />
         </div>
        )}

     <div className="flex items-center justify-between lg:justify-stretch gap-10">
         <p className="font-semibold text-lg">Kortfärg</p>
         {
         ( isOwn || isAdmin()) && (
           <ColorPicker user={user} />)}
     </div>

       <UserInfoForm user={user} isAdmin={isAdmin}/>

     <div className="flex justify-between lg:justify-stretch gap-10">
         <p className="font-semibold text-lg">Profibild:</p>
         <ProfileImageUploader />   
     </div>
   
   </div>
     {
     isOwn && 
       <ChangePasswordForm  className="w-full"/>
     }
   </div>

   {
     isOwn && <UserRolesManager />
   }
   </>
   
  )
}
