<script>
  // Top bar stuff
  import TopAppBar, {
    Row,
    Section,
    Title as TopBarTitle,
    AutoAdjust,
  } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';

  let topAppBar;

  // Drawer stuff
  import Drawer, {
    AppContent,
    Content,
    Header,
    Title as DrawerTitle,
    Subtitle,
    Scrim,
  } from '@smui/drawer';
  import Button, { Label } from '@smui/button';
  import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
  import { H6 } from '@smui/common/elements';

  let open = false;
  let active = 'Inbox';

  function setActive(value) {
    active = value;
    open = false;
  }
</script>

<header>
<TopAppBar bind:this={topAppBar} variant="standard">
  <Row>
    <Section>
      <IconButton class="material-icons" on:click={() => (open = !open)} >menu</IconButton>
      <TopBarTitle>TED</TopBarTitle>
    </Section>
    <Section align="end" toolbar>
      <IconButton class="material-icons" aria-label="Account">account_circle</IconButton>
    </Section>
  </Row>
</TopAppBar>
</header>


<AutoAdjust {topAppBar}>
<div class="drawer-container">
  <!-- Don't include fixed={false} if this is a page wide drawer.
        It adds a style for absolute positioning. -->
  <Drawer variant="modal" fixed={false} bind:open>
    <Header>
      <DrawerTitle>Super Mail</DrawerTitle>
      <Subtitle>The best fake mail app drawer.</Subtitle>
    </Header>
    <Content>
      <List>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Inbox')}
          activated={active === 'Inbox'}
        >
          <Graphic class="material-icons" aria-hidden="true">inbox</Graphic>
          <Text>Inbox</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Star')}
          activated={active === 'Star'}
        >
          <Graphic class="material-icons" aria-hidden="true">star</Graphic>
          <Text>Star</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Sent Mail')}
          activated={active === 'Sent Mail'}
        >
          <Graphic class="material-icons" aria-hidden="true">send</Graphic>
          <Text>Sent Mail</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Drafts')}
          activated={active === 'Drafts'}
        >
          <Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
          <Text>Drafts</Text>
        </Item>

        <Separator />
        <Subheader component={H6}>Labels</Subheader>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Family')}
          activated={active === 'Family'}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Family</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Friends')}
          activated={active === 'Friends'}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Friends</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Work')}
          activated={active === 'Work'}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Work</Text>
        </Item>
      </List>
    </Content>
  </Drawer>

  <!-- Don't include fixed={false} if this is a page wide drawer.
        It adds a style for absolute positioning. -->
  <Scrim fixed={false} />
  <AppContent class="app-content">
    <main class="main-content">
      <br />
      <pre class="status">Active: {active}</pre>
      And some stuff at the bottom.
      <slot/>
    </main>
  </AppContent>
</div>
</AutoAdjust>

<footer>
  Footer goes here.
</footer>

<style>
  header {
    vertical-align: middle;
  }
    /* These classes are only needed because the
    drawer is in a container on the page. */
  .drawer-container {
    display: flex;
    border: 1px solid
      var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    overflow: hidden;
    z-index: 0;
  }
  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }
  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }

  /* Hide everything above this top app bar. */
  :global(app),
  :global(body),
  :global(html) {
    display: block !important;
    height: auto !important;
    width: auto !important;
    position: static !important;
  }
</style>
