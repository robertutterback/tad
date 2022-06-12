<script>
  import { Item, Text, Graphic } from '@smui/list';
  
  export let route;
  export let active, open;
  export let text = undefined;
  export let icon = undefined;

  $: displayText = (text ? text : route.slice(1)).toUpperCase();

</script>

<Item href={route}
      on:click={() => { active = route; open = false; }}
  activated={active === route}>
  {#if icon}
    <Graphic class="material-icons" aria-hidden="true">{icon}</Graphic>
  {/if}
  <Text>{displayText}</Text>
</Item>

