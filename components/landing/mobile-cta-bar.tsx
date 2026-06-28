import { Button } from "@/components/ui/button";

export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/90 p-3 backdrop-blur-lg md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Button
        nativeButton={false}
        render={<a href="#signup" />}
        className="bg-fresh min-h-12 w-full cursor-pointer text-base font-semibold text-fresh-foreground hover:bg-fresh/90 shadow-sm"
      >
        Get my cleaning plan
      </Button>
    </div>
  );
}
