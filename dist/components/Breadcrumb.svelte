<script module lang="ts">
  export interface BreadcrumbItem {
    /** Display label. */
    label: string
    /** Optional href. Items without an href render as plain text (the current page is conventionally hrefless). */
    href?: string
  }

  export interface BreadcrumbProps {
    /** Ordered items from root to current. The last item is treated as the current page (rendered with `aria-current="page"`). */
    items: BreadcrumbItem[]
    /** Separator character. Default `›`. */
    separator?: string
    /** Optional aria-label for the nav landmark. Default `"Breadcrumb"`. */
    ariaLabel?: string
  }
</script>

<script lang="ts">
  let { items, separator = '›', ariaLabel = 'Breadcrumb' }: BreadcrumbProps = $props()

  const lastIndex = $derived(items.length - 1)
</script>

<nav class="dm-breadcrumb" aria-label={ariaLabel}>
  <ol class="dm-breadcrumb__list">
    {#each items as item, index (index)}
      {@const isLast = index === lastIndex}
      <li class="dm-breadcrumb__item">
        {#if item.href && !isLast}
          <a class="dm-breadcrumb__link" href={item.href}>{item.label}</a>
        {:else}
          <span class="dm-breadcrumb__current" aria-current={isLast ? 'page' : undefined}>
            {item.label}
          </span>
        {/if}
        {#if !isLast}
          <span class="dm-breadcrumb__sep" aria-hidden="true">{separator}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .dm-breadcrumb {
    font-family: var(--dm-font-sans);
    font-size: var(--dm-text-sm);
    line-height: var(--dm-leading-normal);
    color: var(--dm-text-secondary);
  }
  .dm-breadcrumb__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--dm-space-2xs);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .dm-breadcrumb__item {
    display: inline-flex;
    align-items: center;
    gap: var(--dm-space-2xs);
  }
  .dm-breadcrumb__link {
    color: var(--dm-text-secondary);
    text-decoration: none;
    border-radius: var(--dm-radius-sm);
    transition: color var(--dm-duration-fast) var(--dm-easing-standard);
  }
  .dm-breadcrumb__link:hover {
    color: var(--dm-accent);
    text-decoration: underline;
  }
  .dm-breadcrumb__link:focus-visible {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 2px;
  }
  .dm-breadcrumb__current {
    color: var(--dm-text-primary);
    font-weight: var(--dm-weight-medium);
  }
  .dm-breadcrumb__sep {
    color: var(--dm-text-muted);
  }
</style>
