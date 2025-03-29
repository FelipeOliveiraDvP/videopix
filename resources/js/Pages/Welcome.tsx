import { Head, Link } from "@inertiajs/react";

export default function Welcome() {
  return (
    <>
      <Head title="Welcome" />
      <div>
        <h1>Bem vindo ao Video PIX</h1>
        <Link href={route("login")}></Link>
      </div>
    </>
  );
}
