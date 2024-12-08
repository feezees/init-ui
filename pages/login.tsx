import dynamic from 'next/dynamic';
import Script from 'next/script';

const DynamicComponentWithNoSSR = dynamic(
  () => import('./loginForm'),
  { ssr: false }
)

export default function LoginPage() {
  return (
    <div className="flex bg-slate-900 h-screen w-screen justify-center items-center border-pink-100">
      <DynamicComponentWithNoSSR />
      <Script async src="https://telegram.org/js/telegram-web-app.js" />
    </div>
  );
}

