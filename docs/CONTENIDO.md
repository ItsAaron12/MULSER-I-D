# Cómo agregar contenido

## Un proyecto
En `src/data/projects.ts` añade un objeto (el compilador valida los campos):

```ts
{
  slug: "mi-proyecto",          // URL: /proyectos/mi-proyecto/
  name: "MI PROYECTO",
  monogram: "MP",
  division: "aplicacion",       // id de una división existente
  status: "development",        // development | laboratory | research
  accent: "#29d9fa",
  summary: "Texto corto para la tarjeta.",
  detail: "Descripción para el modal y la ficha.",
}
```

## Una división
En `src/data/divisions.ts`: `{ id: "nueva", label: "Nueva división" }`. El filtro aparece cuando algún
proyecto la usa. Un estado nuevo se agrega a `ProjectStatus` y a `projectStatusLabels`.

## Un servicio o línea de investigación
En `src/data/services.ts`, con `group: "capability"` (franja bajo el hero) o `"research"` (sección Investigación).

## Textos de sección y contacto
`src/data/site-content.ts` (textos) y `src/config/site.ts` (navegación, estado de publicación, canales de
contacto). Al añadir canales a `contactChannels`, el diálogo de contacto los mostrará.

Los textos actuales provienen de LAB01 y **siguen pendientes de aprobación editorial**.
