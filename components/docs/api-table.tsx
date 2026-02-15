import { cn } from "@/lib/utils";

interface ApiTableProps {
  headers: string[];
  rows: string[][];
  className?: string;
}

export function ApiTable({ headers, rows, className }: ApiTableProps) {
  return (
    <div className={cn("my-6 overflow-x-auto rounded-xl border border-border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-muted-foreground">
                  {j === 0 ? (
                    <code className="text-xs px-1.5 py-0.5 rounded bg-muted text-foreground font-mono">
                      {cell}
                    </code>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
