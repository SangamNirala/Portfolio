import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getTermByName } from "@/data/glossary";

interface GlossaryTooltipProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}

export function GlossaryTooltip({ term, children, className = "" }: GlossaryTooltipProps) {
  const glossaryTerm = getTermByName(term);

  if (!glossaryTerm) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`cursor-help underline decoration-dotted decoration-primary underline-offset-2 hover:text-primary transition-colors ${className}`}>
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-2">
          <p className="font-semibold text-sm">{glossaryTerm.term}</p>
          {glossaryTerm.abbreviation && (
            <p className="text-xs text-muted-foreground">Abbreviation: {glossaryTerm.abbreviation}</p>
          )}
          <p className="text-sm">{glossaryTerm.definition}</p>
          {glossaryTerm.examples && glossaryTerm.examples.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Examples:</p>
              <ul className="text-xs text-muted-foreground list-disc list-inside">
                {glossaryTerm.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-xs text-muted-foreground pt-1">Category: {glossaryTerm.category}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
