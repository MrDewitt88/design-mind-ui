export type RadioSize = 'sm' | 'md' | 'lg';
export interface RadioProps {
    /** This radio's value. Selected when it equals the surrounding RadioGroup's value. */
    value: string;
    /** Visible inline label. */
    label: string;
    size?: RadioSize;
    /** Per-radio disabled (added on top of RadioGroup disabled). */
    disabled?: boolean;
}
declare const Radio: import("svelte").Component<RadioProps, {}, "">;
type Radio = ReturnType<typeof Radio>;
export default Radio;
//# sourceMappingURL=Radio.svelte.d.ts.map