import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth";
import { Header } from "@/components/Header/Header";
import { RegisterForm } from "@/components/Form/Register";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  return (
    <section className="flex h-[70vh] items-center justify-center">
      <Header session={session} />
      <RegisterForm />
    </section>
  );
}
