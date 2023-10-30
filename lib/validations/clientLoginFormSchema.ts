import * as z from "zod"

const clientLoginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address"
  })
})
export default clientLoginFormSchema
