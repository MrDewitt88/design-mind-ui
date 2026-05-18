<script module lang="ts">
  import type { TextTone } from '../../components/Text.svelte'

  /** Matches `@theseus/core` `kind=text` props. */
  export interface TextKindProps {
    value: string
    tone?: TextTone
  }
</script>

<script lang="ts">
  import Text from '../../components/Text.svelte'

  let { value, tone = 'primary' }: TextKindProps = $props()
</script>

<Text {tone}>{value}</Text>
