import * as z from "zod"

const clientDetailsFormSchema = z.object({
  fullName: z.string().nonempty({
    message: "Full name is required",
  }),
  githubHandle: z.string().nonempty({
    message: "Github handle is required",
  }),
  weeklyCost: z.string({
    required_error: "Weekly cost is required",
  }).min(1, {
    message: "Valid Weekly cost is required",
  }),
  twitterHandle: z.string().optional(),
  sherlockHandle: z.string().optional(),
  codeArenaHandle: z.string().optional(),
  inviteCode: z.string().nonempty({
    message: "Invite code is required",
  }),
})
export default clientDetailsFormSchema
