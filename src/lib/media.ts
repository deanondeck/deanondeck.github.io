/* Image + YouTube helpers shared across the site. */

export const img = (name: string, ext = "jpg") => `/img/${name}.${ext}`;

export function ytId(input: string) {
  const m = input.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : input.trim();
}

export function heroEmbedSrc(idOrUrl: string) {
  const id = ytId(idOrUrl);
  const p = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: id, // loop=1 needs the id echoed here
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    showinfo: "0",
    disablekb: "1",
    fs: "0",
    iv_load_policy: "3",
    cc_load_policy: "0",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${p.toString()}`;
}
