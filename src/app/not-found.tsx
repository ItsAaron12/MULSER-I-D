import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page py-24" aria-labelledby="nf-title">
      <h1 id="nf-title" className="text-4xl font-semibold tracking-tight">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md text-muted">La dirección no existe en esta maqueta. Regresa al inicio para continuar.</p>
      <Button href="/" className="mt-8" icon="arrow-right">
        Ir al inicio
      </Button>
    </section>
  );
}
