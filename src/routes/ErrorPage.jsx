import { Link, useRouteError } from "react-router-dom";
import useSeo from "@/hooks/useSeo";
import { primaryButton } from "@/components/ui/buttonStyles";

export default function ErrorPage() {
  const error = useRouteError();
  useSeo({ title: "Something broke", noindex: true });

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-screen-xl flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-eyebrow uppercase text-fg-low">Something broke</p>
      <h1 className="font-display text-4xl text-fg-hi">
        This page could not load
      </h1>
      <p className="max-w-[46ch] text-body text-fg-mid [text-wrap:pretty]">
        {error?.statusText ||
          error?.message ||
          "An unexpected error happened. Trying again usually helps."}
      </p>
      <Link to="/" className={`mt-2 ${primaryButton}`}>
        Back to home
      </Link>
    </div>
  );
}
