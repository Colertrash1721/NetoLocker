import { redirect } from 'next/navigation';

export default function NotFound() {
  redirect('/login'); // 🔁 redirige automáticamente
}
