import { UserProfile } from "@auth0/nextjs-auth0"

export const fakeUser: UserProfile = {
  sub: "auth0|5fe1c3f1d1e0eff6c2dff18d",
  name: "Jane Doe",
  nickname: "jdoe",
  email: "jdoe@gitreads.com",
  email_verified: true,
  picture: "https://avatar.com/jdoe",
  updated_at: null,
}
