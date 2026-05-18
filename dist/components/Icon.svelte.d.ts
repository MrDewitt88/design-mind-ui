import { type IconName } from '../icons/icon-set.js';
export type { IconName };
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type IconTone = 'inherit' | 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'danger';
export interface IconProps {
    /** Name from the curated set in `icons/icon-set.ts`. */
    name: IconName;
    /** Token size or explicit pixel number. Default `md` (20px). */
    size?: IconSize;
    /** Colour. `inherit` (default) uses surrounding text colour via `currentColor`. */
    tone?: IconTone;
    /** Accessible label. When omitted the icon is treated as decorative (`aria-hidden="true"`). */
    label?: string | undefined;
}
declare const Icon: import("svelte").Component<IconProps, {}, "">;
type Icon = ReturnType<typeof Icon>;
export default Icon;
//# sourceMappingURL=Icon.svelte.d.ts.map