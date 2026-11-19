import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectStatusLabels } from "@/data/divisions";
import { siteContent } from "@/data/site-content";
import { Button } from "@/components/ui/Button";
import { contentSource } from "@/lib/content-source";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Con exportación estática, cada proyecto se genera como /proyectos/<slug>/index.html. */
export async function generateStaticParams() {
  const projects = await contentSource.getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await contentSource.getProject(slug);
  return project ? { title: project.name, description: project.summary } : {};
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, divisions] = await Promise.all([
    contentSource.getProject(slug),
    contentSource.getDivisions(),
  ]);
  if (!project) notFound();
  const division = divisions.find((d) => d.id === project.division);

  return (
    <article className="container-page py-16 sm:py-24" aria-labelledby="project-title">
      <Button href="/#ecosistema" variant="ghost" size="sm" className="-ml-3 mb-8">
        ← Volver a proyectos
      </Button>
      <p className="text-xs font-bold text-ember">
        {projectStatusLabels[project.status]}
        {division ? ` · ${division.label}` : ""}
      </p>
      <h1 id="project-title" className="mt-3 text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
        {project.name}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-[1.7] text-muted">{project.summary}</p>
      <p className="mt-6 max-w-2xl text-base leading-[1.85]">{project.detail}</p>
      <p className="mt-10 max-w-2xl border-t border-line pt-5 text-xs text-muted">
        {siteContent.projects.modalDisclaimer}
      </p>
    </article>
  );
}
