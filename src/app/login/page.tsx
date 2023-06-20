import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth";
import { Header } from "@/components/Header/Header";
import { LoginForm } from "@/components/Form/Login";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <section className="flex h-[70vh] items-center justify-center">
      <Header session={session} />
      <LoginForm />
    </section>
  );
}
