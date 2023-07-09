import { Center } from '@/styles/Center';
import { LoginForm } from '@/components/Form/Login';

export default async function Page() {
  return (
    <Center className="-mt-24 ">
      <LoginForm />
    </Center>
  );
}
