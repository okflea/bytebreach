import * as z from "zod"

const clientDetailsFormSchema = z.object({
  fullName: z.string().nonempty({
    message: "Full name is required",
  }),
  companyName: z.string().nonempty({
    message: "Github handle is required",
  }),
  website: z.string().optional(),
  twitterHandle: z.string().optional(),
  githubHandle: z.string().optional(),
  inviteCode: z.string().nonempty({
    message: "Invite code is required",
  }),
})
export default clientDetailsFormSchema
