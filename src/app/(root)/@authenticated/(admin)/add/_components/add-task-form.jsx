"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  
} from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import {  Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import { eachDayOfInterval, formatISO, parse } from "date-fns"
import { useState } from "react"
import { useUsers } from "@/context/usersContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTasks } from "@/context/tasksContext"
import { useRouter } from "next/navigation"

const base = z.object({
  title: z.string().nonempty({message: "Uppgift är obligatorisk"}),
  ownerId: z.string().nonempty({message: "Du måste välja en användare"}),
  deadline: z.date({ required_error: "Deadline krävs"})
})

const single = base.extend({
  reoccuring: z.literal("none"),
  date: z.date(),
  deadline: z.date()
})
const multiple = base.extend({
  reoccuring: z.literal("multiple"),
  dateMultiple: z.array(z.date()).min(1, "Välj minst ett datum"), 
})
const range = base.extend({
  reoccuring: z.literal("range"),
  dateRange: z.object({
    from: z.date(),
    to: z.date()
  }) 
})
  // reoccuring: none / multiple / range

const formSchema = z.discriminatedUnion("reoccuring", [
  single,
  multiple,
  range
])

export const AddTaskForm = ({ isModal }) => {

  const searchParams = useSearchParams()
  const presetDate = searchParams.get("date")
  const presetUserId = searchParams.get("userId")

  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const router = useRouter()
  const {addTask, loading} = useTasks()
  const { users} = useUsers()


   const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      ownerId: presetUserId ?? "",
      reoccuring: "none",
      date: presetDate ? parse(presetDate, "yyyy-MM-dd", new Date()) ?? new Date() : new Date()
    },
  })

  const setDeadlineTime = (date) => {
    const d = new Date(date)
    d.setHours(23, 59, 0,0)
    return d
  }

  const reoccuringType = form.watch("reoccuring")

    async function onSubmit(values) {
     const base = {
      title: values.title,
      ownerId: values.ownerId
    }
    


     try {
      setSubmitted(true)
      if (values.reoccuring === "none") {
        await addTask({...base, date: values.date, deadline: setDeadlineTime(values.deadline ?? values.date)})
      }
      
      if (values.reoccuring === "multiple") {
        await Promise.all(
          values.dateMultiple.map(d => addTask({ ...base, date: d, deadline: setDeadlineTime(d)}))
        )
      }

      if (values.reoccuring === "range") {
        const days = eachDayOfInterval({
          start: values.dateRange.from,
          end: values.dateRange.to
          })
          await Promise.all(
          days.map(d => addTask({ ...base, date: d, deadline: setDeadlineTime(d)}))
        )
       

      }

      form.reset()

      if(!isModal)
       router.push("/")
      else
      router.back()
     } catch (error) {
      console.log(error)
      setErrorMessage("Något gick fel. Försök igen.")
      setSubmitted(false)
     }
  }

  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uppgift</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="ownerId"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Tilldelad till</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full sm:w-52 justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? users.find(
                            (user) => user.uid === field.value
                          )?.userName
                        : "Välj användare"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-52 p-0">
                  <Command>
                    <CommandInput placeholder="Sök användare..." />
                    <CommandList>
                      <CommandEmpty>Inga användare hittades.</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => (
                          <CommandItem
                            value={user.userName}
                            key={user.uid}
                            onSelect={() => {
                              form.setValue("ownerId", user.uid)
                            }}
                          >
                            {user.userName}
                            <Check
                              className={cn(
                                "ml-auto",
                                user.uid.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reoccuring"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upprepning</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className=" w-full sm:w-52">
                    <SelectValue placeholder="Väly datum upprepning" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">Ingen</SelectItem>
                  <SelectItem value="multiple">Flera dagar</SelectItem>
                  <SelectItem value="range">Från - Till</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                { reoccuringType === "none" && 'Välj hur ofta uppgiften ska upprepas. Väjer du "ingen" så kommer uppgiften att skapas för ett datum.'}
                { reoccuringType === "multiple" && 'Välj flera dagar som du vill ha uppgiften på.'}
                { reoccuringType === "range" && 'Välj ett start- och sluutedatum för uppgiften. Uppgiften kommer att upprepas varje dag mellan dessa datum.'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


    <div className="flex flex-col sm:grid-cols-2 gap-6"> 
        {reoccuringType === "none" && (
         <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
               />
            <FormDescription>
              Välj start - och slutdatum för uppgiften.
            </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        )} 
        {reoccuringType === "multiple" && (
         <FormField
          control={form.control}
          name="dateMultiple"
          render={({ field }) => (
            <FormItem>
              <Calendar
                mode="multiple"
                selected={field.value}
                onSelect={field.onChange}
               />
              <FormMessage />
            </FormItem>
          )}
        />

        )} 

        {reoccuringType === "range" && (
         <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <Calendar
                mode="range"
                selected={field.value}
                onSelect={field.onChange}
               />
              <FormMessage />
            </FormItem>
          )}
        />
        
      )} 

     {reoccuringType === "none" && form.watch("date") && (
      <FormField
       control={form.control}
       name="deadline"
       render={({ field }) => (
         <FormItem>
           <Calendar
             mode="single"
             selected={field.value}
             onSelect={field.onChange}
            />
            <FormDescription>
              Välj senaste datum som uppgiften ska vara klar. 
            </FormDescription>
           <FormMessage />
         </FormItem>
       )}
     />
      )}
  </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <Button disabled={loading || submitted} type="submit">{loading ? "Skapar..." : "Skapa uppgift" }</Button>
      </form>
    </Form>
  )
}
