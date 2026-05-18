export interface RadioGroupProps {
    /** Two-way bound value (the selected Radio's `value`). */
    value?: string;
    /** Shared form-submit name across radios. Auto-generated if omitted. */
    name?: string;
    /** Visible group label rendered above the radios. */
    label?: string;
    /** Disabled propagates to every child Radio. */
    disabled?: boolean;
    /** Invalid propagates to every child Radio's visual. */
    invalid?: boolean;
    /** Layout direction. Default `vertical`. */
    orientation?: 'vertical' | 'horizontal';
    children: import('svelte').Snippet;
}
declare const RadioGroup: import("svelte").Component<RadioGroupProps, {}, "value">;
type RadioGroup = ReturnType<typeof RadioGroup>;
export default RadioGroup;
//# sourceMappingURL=RadioGroup.svelte.d.ts.map