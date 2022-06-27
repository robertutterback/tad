<script>
  import { Item, Text, Graphic } from '@smui/list';
  
  export let route;
  export let active, open;
  export let text = undefined;
  export let icon = undefined;
  export let disabled = false;

  $: displayText = (text ? text : route.slice(1)).toUpperCase();

</script>


<Item href={route} {disabled}
      on:click={() => { active = route.split('/')[1]; open = false; }}
  activated={active === route.split('/')[1]}>

  {#if icon}
    <Graphic class="material-icons" aria-hidden="true">{icon}</Graphic>
  {/if}
  <Text>{displayText}</Text>
</Item>