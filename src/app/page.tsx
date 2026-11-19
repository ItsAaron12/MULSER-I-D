import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { MethodSection } from "@/components/sections/MethodSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { contentSource } from "@/lib/content-source";

export default async function HomePage() {
  const [projects, divisions, services, steps] = await Promise.all([
    contentSource.getProjects(),
    contentSource.getDivisions(),
    contentSource.getServices(),
    contentSource.getMethodSteps(),
  ]);

  return (
    <>
      <Hero capabilities={services.filter((s) => s.group === "capability")} />
      <ProjectsSection projects={projects} divisions={divisions} />
      <ResearchSection lines={services.filter((s) => s.group === "research")} />
      <MethodSection steps={steps} />
      <ContactSection />
    </>
  );
}
