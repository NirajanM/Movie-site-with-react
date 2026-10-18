const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const tmdb = (path, size = "w342") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

const buildSources = (path, widths, base) => {
  if (!path) return { src: null, srcSet: undefined };
  return {
    src: `${IMAGE_BASE}/${base}${path}`,
    srcSet: widths
      .map((w) => `${IMAGE_BASE}/${w}${path} ${w.slice(1)}w`)
      .join(", "),
  };
};

export const posterSources = (path) =>
  buildSources(path, ["w185", "w342", "w500"], "w342");

export const backdropSources = (path) =>
  buildSources(path, ["w780", "w1280", "w1920"], "w1280");

export const profileSources = (path) =>
  buildSources(path, ["w185", "w300"], "w185");
