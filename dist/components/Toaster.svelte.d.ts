export type ToasterPlacement = 'top-start' | 'top-end' | 'top-center' | 'bottom-start' | 'bottom-end' | 'bottom-center';
export interface ToasterProps {
    /** Corner anchor. Default `bottom-end`. */
    placement?: ToasterPlacement;
    /** Maximum stack height. Excess toasts queue invisibly until older ones dismiss. Default 5. */
    max?: number;
}
declare const Toaster: import("svelte").Component<ToasterProps, {}, "">;
type Toaster = ReturnType<typeof Toaster>;
export default Toaster;
//# sourceMappingURL=Toaster.svelte.d.ts.map