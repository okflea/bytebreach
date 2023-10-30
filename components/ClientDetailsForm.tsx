
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import clientDetailsFormSchema from '@/lib/validations/clientDetailsFormSchema'
import { ScrollArea } from './ui/scroll-area'
import { useRouter } from "next/navigation"
import { web3auth } from "@/lib/web3AuthInit"

const ClientDetailsForm = () => {

  const router = useRouter()
  const form = useForm<z.infer<typeof clientDetailsFormSchema>>({
    resolver: zodResolver(clientDetailsFormSchema),
    defaultValues: {
      fullName: '',
      githubHandle: '',
      weeklyCost: "",
      twitterHandle: '',
      sherlockHandle: '',
      codeArenaHandle: '',
      inviteCode: '',
    },
  })

  async function onSubmit(data: z.infer<typeof clientDetailsFormSchema>) {
    toast({
      title: "Successful",
      description: "details submitted",
      duration: 3000,
    })
    //save email & redirect
    const userDetails = await web3auth.getUserInfo()
    const userEmails = JSON.parse(localStorage.getItem('userEmails') || "[]")
    localStorage.setItem(
      'userEmails', JSON.stringify([...userEmails, userDetails.email || ""])
    )
    router.push('/dashboard')
  }
  return (
    <>
      <ScrollArea className="max-h-screen w-[400px]">
        <div className='flex flex-col'>
          <p>Contact Details</p>
          <p className='text-slate-400 text-sm mt-2'>Enter your details to Login</p>
          <Separator className="my-6" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className='w-[390px]'
                        placeholder="John Doe"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github Handle</FormLabel>
                    <FormControl>
                      <Input
                        className='w-[390px]'
                        placeholder="JohnDoe"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weeklyCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weekly Cost(INR)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={1}
                        className='w-[390px]'
                        placeholder="500"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitterHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter Handle</FormLabel>
                    <FormControl>
                      <Input
                        className='w-[390px]'
                        placeholder="JohnDoe"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div tabIndex={-1} className='flex justify-start'>

                <FormField
                  control={form.control}
                  name="sherlockHandle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sherlock Handle</FormLabel>
                      <FormControl>
                        <Input
                          className='w-[190px] mr-2 '
                          placeholder="JohnDoe"
                          {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="codeArenaHandle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CodeArena Handle</FormLabel>
                      <FormControl>
                        <Input
                          className='w-[190px]'
                          placeholder="JohnDoe"
                          {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="mt-2" />

              <FormField
                control={form.control}
                name="inviteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invite Code</FormLabel>
                    <FormControl>
                      <Input
                        className='w-[390px]'
                        placeholder="asd123ad"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-center'>
                <Button
                  className='w-1/3'
                  type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </>
  )
}
export default ClientDetailsForm
