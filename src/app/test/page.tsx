import { signOut } from "@/lib/supabase/actions";
import { createClientForServer } from "@/lib/supabase/server";

export default async function testPage() {
  const supabase = await createClientForServer();

  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    return (
      <div>
        <h1>Not Authenticated</h1>
      </div>
    );
  }

  const {
    data: {
      user: { user_metadata, app_metadata },
    },
  } = session;

  const { email } = user_metadata;

  const Email = email ? `${email}` : "email Not Set";

  console.log(session);
  return (
    <div>
      <p>Email: {Email}</p>

      <form action={signOut}>
        <button type="submit">로그아웃</button>
      </form>
    </div>
  );
}
