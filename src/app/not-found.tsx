import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="text-[clamp(3rem,12vw,8rem)] leading-none">
        Out of
        <br />
        <span
          className="text-transparent"
          style={{ WebkitTextStroke: '2px rgba(246,247,248,.42)' }}
        >
          play.
        </span>
      </h1>
      <p className="mt-6 max-w-md text-sm text-bone-400">
        That page has left the pitch. Try the shop, or design a kit from
        scratch.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/shop" className="btn btn-accent btn-lg">
          Shop all products
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/" className="btn btn-outline btn-lg">
          Back to home
        </Link>
      </div>
    </div>
  );
}
