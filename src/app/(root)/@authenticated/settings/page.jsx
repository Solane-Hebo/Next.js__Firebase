import { Settings } from "./_components/settings"

function SettingsPage() {
  return (
    <div className="pb-10 pt-5">
      <div className="mb-10">
        <p className="font-semibold text-lg text-center">Profilinställningar</p>
        <p className="text-sm text-muted-foreground text-center">Här kan du ändra ditt användarnamn och din profilbild.</p>
      </div>
      <Settings />

    </div>
  )
}

export default SettingsPage