import { Button } from "@/components/ui/Button";
import { Floret, ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="nf">
      <div className="nf__inner">
        <Floret size={34} />
        <span className="nf__code">404 · Page not found</span>
        <h1 className="nf__title">
          This page never <em>bloomed</em>.
        </h1>
        <p className="nf__sub">The link may be old or mistyped. Everything worth seeing lives on the home page.</p>
        <Button variant="filled" size="lg" href="/" icon={<ArrowRight />}>
          Back to the garden
        </Button>
      </div>
    </div>
  );
}
