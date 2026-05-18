/**
 * Design-Mind implementation of the `@theseus/core` `ComponentRenderer`
 * seam (M15). Maps each registered `kind` to a Svelte 5 component and
 * mounts it on demand.
 *
 * Built-in kinds match `createDefaultKindRegistry()` from `@theseus/core`:
 *   - `text`       → TextKind (wraps Text)
 *   - `heading`    → HeadingKind (wraps Heading)
 *   - `card`       → Card
 *   - `key-value`  → KeyValueList
 *
 * Recursive composition (M15.2): when `descriptor.children` is non-empty
 * and the mounted component exposes a `[data-dm-children]` slot, each
 * child descriptor is resolved via `renderer.resolve()` and mounted into
 * the slot. Unmount cascades leaf-up (children awaited first, then the
 * parent). Components without a slot silently drop children — Mode-A
 * callers use the `children` snippet instead.
 */
import { flushSync, mount, unmount } from 'svelte';
import Card from '../components/Card.svelte';
import ChartBar from '../components/ChartBar.svelte';
import ChartLine from '../components/ChartLine.svelte';
import KeyValueList from '../components/KeyValueList.svelte';
import Table from '../components/Table.svelte';
import HeadingKind from './internal/HeadingKind.svelte';
import TextKind from './internal/TextKind.svelte';
const DEFAULT_KIND_MAP = {
    text: TextKind,
    heading: HeadingKind,
    card: Card,
    'key-value': KeyValueList,
    // Data Display Phase 2 — matches Theseus#15 (feat/data-display-schemas).
    // Components render today via Mode A; full descriptor validation kicks
    // in upstream once that PR merges into @theseus/core main.
    table: Table,
    'chart.line': ChartLine,
    'chart.bar': ChartBar,
};
export function createDesignMindRenderer(options = {}) {
    const kindMap = { ...DEFAULT_KIND_MAP, ...options.kinds };
    const renderer = {
        name: 'design-mind',
        resolve(descriptor) {
            const Component = kindMap[descriptor.kind];
            if (!Component) {
                // Unknown kind — let the host try the next renderer in its chain.
                return null;
            }
            const children = descriptor.children;
            const payload = {
                mount(target, props) {
                    const targetEl = target;
                    // Snapshot the last existing child BEFORE Svelte appends ours,
                    // so we can scope `[data-dm-children]` to the just-mounted
                    // subtree. Without this scope, sibling parents mounted into
                    // the same target would all resolve to the first sibling's
                    // slot — leaf-b would land in card-A's children-slot.
                    const lastBefore = targetEl.lastChild;
                    const instance = mount(Component, { target: targetEl, props });
                    // M15.2 recursive children: walk descriptor.children after the
                    // parent paints, then mount each into the parent's slot.
                    const childUnmounts = [];
                    if (children && children.length > 0) {
                        flushSync();
                        // Collect the DOM roots Svelte just appended for THIS mount call.
                        const newRoots = [];
                        let node = lastBefore ? lastBefore.nextSibling : targetEl.firstChild;
                        while (node) {
                            if (node instanceof Element)
                                newRoots.push(node);
                            node = node.nextSibling;
                        }
                        // Find the slot within the just-mounted subtree only.
                        let slot = null;
                        for (const root of newRoots) {
                            if (root.matches('[data-dm-children]')) {
                                slot = root;
                                break;
                            }
                            const found = root.querySelector('[data-dm-children]');
                            if (found) {
                                slot = found;
                                break;
                            }
                        }
                        if (slot) {
                            for (const child of children) {
                                const childResult = renderer.resolve(child);
                                if (!childResult)
                                    continue;
                                const childMount = childResult.payload.mount;
                                childUnmounts.push(childMount(slot, child.props));
                            }
                        }
                        // No slot → component opted out of descriptor-children
                        // composition; Mode-A callers use the `children` snippet.
                    }
                    // Upstream Drift-#101 resolution: `Unmount` is now
                    // `() => void | Promise<void>`. We aggregate child-unmounts
                    // leaf-up (await each) before tearing down the parent so
                    // animations / transitions complete in dependency order.
                    return async () => {
                        for (const u of childUnmounts)
                            await u();
                        return unmount(instance);
                    };
                },
            };
            return { payload, exact: true };
        },
    };
    return renderer;
}
