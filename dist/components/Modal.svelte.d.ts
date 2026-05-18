import type { SpaceToken, RadiusToken } from '@design-mind/tokens';
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export interface ModalProps {
    /** Open state. Two-way bindable. */
    open?: boolean;
    /** Accessible title shown in the header. Also used as `aria-label` when no header snippet is provided. */
    title?: string;
    /** Width preset. `sm` 360px, `md` 520px, `lg` 720px, `xl` 960px, `full` 100% minus gutter. */
    size?: ModalSize;
    /** Click on backdrop dismisses the modal. Default `true`. Disable for required-action modals. */
    dismissOnBackdropClick?: boolean;
    /** ESC key dismisses the modal. Default `true`. */
    dismissOnEscape?: boolean;
    /** Inner padding around the body slot. Default `lg`. */
    padding?: SpaceToken;
    /** Corner radius. Default `lg`. */
    radius?: RadiusToken;
    /** Fires when the modal closes (any reason — backdrop click, ESC, programmatic). */
    onclose?: () => void;
    /** Optional header snippet. Overrides the auto-rendered `title` + close button. */
    header?: import('svelte').Snippet;
    /** Optional footer snippet (e.g. action row). */
    footer?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
}
declare const Modal: import("svelte").Component<ModalProps, {}, "open">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
//# sourceMappingURL=Modal.svelte.d.ts.map