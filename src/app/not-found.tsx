import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-prose py-16 text-center">
      <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-faint uppercase">
        404
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        That page doesn&rsquo;t exist
      </h1>
      <p className="mt-3 text-muted">
        It may have been renamed, or it was never here.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-accent px-4 py-2 text-sm text-accent-fg transition-opacity hover:opacity-90"
      >
        Back home
      </Link>
    </div>
  );
}
