import Link from "next/link";

export default async function UserProfilePage({ params }) {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) {
    return <p className="px-6 py-20">User tidak ditemukan.</p>;
  }
  const user = await res.json();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/users" className="text-sm underline">
        ← Kembali
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{user.name}</h1>
      <p className="text-muted-foreground">@{user.username}</p>

      <div className="mt-8 space-y-2 rounded-lg border p-6">
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
        <p>Company: {user.company.name}</p>
        <p>
          Alamat: {user.address.street}, {user.address.city}
        </p>
      </div>
    </section>
  );
}