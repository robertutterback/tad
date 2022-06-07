<script>
  import Button from '@smui/button';
  import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import List, { Item, Text } from '@smui/list';
  import { Label, Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  import { mdiMenu, mdiAccountCircle } from '@mdi/js';
  import Drawer, {
    AppContent,
    Content,
    Header,
    Subtitle,
  } from '@smui/drawer';

  let topAppBar;
  let drawerMenuOpen = false;

  let active = 'Gray Kittens';
  function setActive(value) { active = value; }
</script>

<TopAppBar bind:this={topAppBar} variant="standard">
  <Row>
    <Section>
      <IconButton aria-label="Menu" on:click={() => (drawerMenuOpen = !drawerMenuOpen)}>
	<Icon component={Svg} viewBox="0 0 24 24">
	  <path fill="currentColor" d={mdiMenu} />
	</Icon>
      </IconButton>
      <Title>TAD</Title>
    </Section>
    <Section align="end" toolbar>
      <IconButton aria-label="Account" on:click={() => alert('not implemented')}>
	<Icon component={Svg} viewBox="0 0 24 24">
	  <path fill="currentColor" d={mdiAccountCircle} />
	</Icon>
      </IconButton>
    </Section>
  </Row>
</TopAppBar>

<div class="drawer-container">
  <Drawer variant="dismissible" bind:drawerMenuOpen>
    <Header>
      <Title>Super Drawer</Title>
      <Subtitle>The best drawer.</Subtitle>
    </Header>
    <Content>
      <List>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Gray Kittens')}
          activated={active === 'Gray Kittens'}
        >
          <Text>Gray Kittens</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('A Space Rocket')}
          activated={active === 'A Space Rocket'}
        >
          <Text>A Space Rocket</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('100 Pounds of Gravel')}
          activated={active === '100 Pounds of Gravel'}
        >
          <Text>100 Pounds of Gravel</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('All of the Shrimp')}
          activated={active === 'All of the Shrimp'}
        >
          <Text>All of the Shrimp</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('A Planet with a Mall')}
          activated={active === 'A Planet with a Mall'}
        >
          <Text>A Planet with a Mall</Text>
        </Item>
      </List>
    </Content>
  </Drawer>
</div>

<AutoAdjust {topAppBar} style="display: flex; justify-content: space-between;">
  <div class="container"><slot /></div>
</AutoAdjust>

<style>
  .drawer-container {
    position: relative;
    display: flex;
    height: 350px;
    max-width: 600px;
    border: 1px solid
      var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    overflow: hidden;
    z-index: 0;
  }
</style>
