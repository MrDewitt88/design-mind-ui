export interface BreadcrumbItem {
    /** Display label. */
    label: string;
    /** Optional href. Items without an href render as plain text (the current page is conventionally hrefless). */
    href?: string;
}
export interface BreadcrumbProps {
    /** Ordered items from root to current. The last item is treated as the current page (rendered with `aria-current="page"`). */
    items: BreadcrumbItem[];
    /** Separator character. Default `›`. */
    separator?: string;
    /** Optional aria-label for the nav landmark. Default `"Breadcrumb"`. */
    ariaLabel?: string;
}
declare const Breadcrumb: import("svelte").Component<BreadcrumbProps, {}, "">;
type Breadcrumb = ReturnType<typeof Breadcrumb>;
export default Breadcrumb;
//# sourceMappingURL=Breadcrumb.svelte.d.ts.map