import { Link } from "react-router-dom";
import useSeo from "@/hooks/useSeo";
import { primaryButton } from "@/components/ui/buttonStyles";

export default function PageNotFound() {
  useSeo({ title: "Page not found", noindex: true });
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-screen-xl flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-eyebrow uppercase text-fg-low">Error 404</p>
      <h1 className="font-display text-5xl text-fg-hi">Page not found</h1>
      <p className="max-w-[46ch] text-body text-fg-mid [text-wrap:pretty]">
        That link does not lead anywhere. It may have moved, or it never
        existed.
      </p>
      <Link to="/" className={`mt-2 ${primaryButton}`}>
        Back to home
      </Link>
    </div>
  );
}
