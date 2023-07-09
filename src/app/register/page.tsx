import { Center } from '@/styles/Center';
import { RegisterForm } from '@/components/Form/Register';

export default async function RegisterPage() {
  return (
    <Center className="-mt-24">
      <RegisterForm />
    </Center>
  );
}
