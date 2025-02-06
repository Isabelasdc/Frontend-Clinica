// pages/admin/index.js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      router.push("/login"); // Se não for admin, redireciona para a página de login
    }
  }, [router]);

  return (
    <div>
      <h1>Bem-vindo, Administrador</h1>
      <p>Aqui você pode gerenciar o sistema.</p>
    </div>
  );
}
