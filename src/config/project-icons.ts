import type { StaticImageData } from "next/image";
import bichaBi from "@/assets/icons/BichaBi.png";
import eetil from "@/assets/icons/Eetil.png";
import jun from "@/assets/icons/Jun.png";
import myLookStore from "@/assets/icons/MyLookStore.png";
import nexar from "@/assets/icons/Nexar.png";
import ofnex from "@/assets/icons/ofnex.png";

/**
 * Iconos de las tarjetas de proyectos.
 *
 * Usar el slug estable del proyecto para asociar la imagen.
 * Las importaciones estáticas aseguran que Next.js incluya los archivos
 * en el sitio exportado y respete el basePath de GitHub Pages.
 *
 * Si en el futuro se agrega un proyecto sin imagen, la tarjeta
 * seguirá mostrando su monograma.
 */
export const projectIcons: Readonly<Record<string, StaticImageData>> = {
  eetil,
  "bicha-bi": bichaBi,
  jun,
  "my-look-store": myLookStore,
  ofnex,
  nexar,
};
