<script module lang="ts">
  let nextMenuId = 0
  function genMenuId(): string {
    return `dm-menu-${++nextMenuId}`
  }

  export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

  export interface MenuItem {
    /** Stable key for the item (used as React-style list key). */
    readonly key: string
    /** Display label. */
    readonly label: string
    /** Action handler. Returns `boolean | void` — return `false` to keep the menu open after activation. */
    readonly onselect?: () => boolean | void
    /** Disabled state. */
    readonly disabled?: boolean
    /** Visual variant for destructive entries. */
    readonly tone?: 'default' | 'danger'
  }

  export interface MenuProps {
    /** Menu items, top to bottom. */
    items: MenuItem[]
    /** Anchor placement relative to the trigger. Default `bottom-start`. */
    placement?: MenuPlacement
    /** Trigger snippet — must call the provided callbacks to open/close. */
    trigger: import('svelte').Snippet<
      [
        {
          open: () => void
          close: () => void
          toggle: () => void
          isOpen: boolean
          attrs: { 'aria-haspopup': 'menu'; 'aria-expanded': 'true' | 'false'; 'aria-controls': string }
        },
      ]
    >
  }
</script>

<script lang="ts">
  let { items, placement = 'bottom-start', trigger }: MenuProps = $props()

  const menuId = genMenuId()
  let isOpen = $state(false)
  let menuEl: HTMLDivElement | null = $state(null)
  let activeIndex = $state(-1)

  function open() {
    if (isOpen) return
    isOpen = true
    activeIndex = items.findIndex((i) => !i.disabled)
  }
  function close() {
    if (!isOpen) return
    isOpen = false
    activeIndex = -1
  }
  function toggle() {
    isOpen ? close() : open()
  }

  function activate(idx: number) {
    const item = items[idx]
    if (!item || item.disabled) return
    const keepOpen = item.onselect?.() === false
    if (!keepOpen) close()
  }

  function moveActive(delta: number) {
    if (items.length === 0) return
    let next = activeIndex
    for (let i = 0; i < items.length; i++) {
      next = (next + delta + items.length) % items.length
      if (!items[next]?.disabled) {
        activeIndex = next
        return
      }
    }
  }

  function handleMenuKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        moveActive(+1)
        break
      case 'ArrowUp':
        event.preventDefault()
        moveActive(-1)
        break
      case 'Home':
        event.preventDefault()
        activeIndex = items.findIndex((i) => !i.disabled)
        break
      case 'End':
        event.preventDefault()
        for (let i = items.length - 1; i >= 0; i--) {
          if (!items[i]?.disabled) {
            activeIndex = i
            break
          }
        }
        break
      case 'Escape':
        event.preventDefault()
        close()
        break
      case 'Enter':
      case ' ':
        if (activeIndex >= 0) {
          event.preventDefault()
          activate(activeIndex)
        }
        break
    }
  }

  function handleDocumentClick(event: MouseEvent) {
    if (!isOpen) return
    const target = event.target as Node | null
    if (target && menuEl && menuEl.contains(target)) return
    close()
  }

  $effect(() => {
    if (!isOpen) return
    document.addEventListener('click', handleDocumentClick, true)
    return () => document.removeEventListener('click', handleDocumentClick, true)
  })

  $effect(() => {
    if (!isOpen || !menuEl) return
    const btn = menuEl.querySelectorAll<HTMLButtonElement>('button[role="menuitem"]')[activeIndex]
    btn?.focus()
  })

  const placementClass = $derived(`dm-menu--${placement}`)
</script>

<div class="dm-menu-anchor">
  {@render trigger({
    open,
    close,
    toggle,
    isOpen,
    attrs: {
      'aria-haspopup': 'menu',
      'aria-expanded': isOpen ? 'true' : 'false',
      'aria-controls': menuId,
    },
  })}

  {#if isOpen}
    <div
      bind:this={menuEl}
      id={menuId}
      class={['dm-menu', placementClass].join(' ')}
      role="menu"
      tabindex={-1}
      onkeydown={handleMenuKeydown}
    >
      {#each items as item, idx (item.key)}
        <button
          class={['dm-menu__item', item.tone === 'danger' && 'dm-menu__item--danger', item.disabled && 'dm-menu__item--disabled'].filter(Boolean).join(' ')}
          type="button"
          role="menuitem"
          tabindex={idx === activeIndex ? 0 : -1}
          disabled={item.disabled}
          onclick={() => activate(idx)}
          onmouseenter={() => {
            if (!item.disabled) activeIndex = idx
          }}
        >
          {item.label}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .dm-menu-anchor {
    position: relative;
    display: inline-flex;
  }
  .dm-menu {
    position: absolute;
    z-index: 10;
    min-width: 180px;
    padding: var(--dm-space-2xs);
    background: var(--dm-surface);
    border: 1px solid var(--dm-border-subtle);
    border-radius: var(--dm-radius-md);
    box-shadow: var(--dm-shadow-md);
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .dm-menu--bottom-start { top: calc(100% + var(--dm-space-2xs)); left: 0; }
  .dm-menu--bottom-end { top: calc(100% + var(--dm-space-2xs)); right: 0; }
  .dm-menu--top-start { bottom: calc(100% + var(--dm-space-2xs)); left: 0; }
  .dm-menu--top-end { bottom: calc(100% + var(--dm-space-2xs)); right: 0; }

  .dm-menu__item {
    display: flex;
    align-items: center;
    gap: var(--dm-space-xs);
    padding: var(--dm-space-xs) var(--dm-space-sm);
    border: 0;
    border-radius: var(--dm-radius-sm);
    background: transparent;
    color: var(--dm-text-primary);
    font-family: var(--dm-font-sans);
    font-size: var(--dm-text-sm);
    line-height: var(--dm-leading-tight);
    cursor: pointer;
    text-align: start;
    white-space: nowrap;
  }
  .dm-menu__item:hover:not(:disabled),
  .dm-menu__item:focus {
    background: var(--dm-border-subtle);
    outline: none;
  }
  .dm-menu__item:focus-visible {
    /* Inset offset (-2px) keeps the focus-ring inside the menu-item's tight
     * chrome — outset would overflow into adjacent items. Convention: outset
     * (+2px) elsewhere; inset (-2px) only for tight popover-children like
     * menuitems and segmented-control buttons. */
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: -2px;
  }
  .dm-menu__item--danger {
    color: var(--dm-danger);
  }
  .dm-menu__item--disabled,
  .dm-menu__item:disabled {
    color: var(--dm-text-muted);
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
