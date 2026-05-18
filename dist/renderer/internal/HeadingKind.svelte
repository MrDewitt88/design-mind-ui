<script module lang="ts">
  /** Matches `@theseus/core` `kind=heading` props. */
  export interface HeadingKindProps {
    value: string
    level: 1 | 2 | 3 | 4 | 5 | 6
  }
</script>

<script lang="ts">
  import Heading from '../../components/Heading.svelte'

  let { value, level }: HeadingKindProps = $props()
</script>

<Heading {level}>{value}</Heading>
