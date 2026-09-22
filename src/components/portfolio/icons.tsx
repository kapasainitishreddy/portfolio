import type { SVGProps } from "react";

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M5 2.75h6l4 4v10.5H5V2.75Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 2.75v4h4M7.5 11h5M7.5 14h5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function MenuIcon({ open = false, ...props }: SVGProps<SVGSVGElement> & { open?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      {open ? (
        <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" />
      ) : (
        <path d="M3 6h14M3 14h14" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  );
}

export function ExternalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M8 5h7v7M15 5 7 13M13 10v5H5V7h5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
