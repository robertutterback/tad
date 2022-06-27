<script>
  import Button, { Group, GroupItem, Icon } from '@smui/button';
  import List, { Item, Text } from '@smui/list';
  import Menu from '@smui/menu';

  export let disabled = false;
  let menu;
</script>


<Group variant="raised">
  <div use:GroupItem>
    <Button variant="raised" {disabled} style="padding: 0.5em;"
            on:click$preventDefault={() => menu.setOpen(true)}>
      Apply
      <Icon class="material-icons" style="margin: 0;">arrow_drop_down</Icon>
    </Button>
    <Menu bind:this={menu} anchorCorner="TOP_LEFT">
    <List>
      <slot />
    </List>
    </Menu>
  </div>
  </Group>