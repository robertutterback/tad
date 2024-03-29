<script>
  /// It makes sense to split this into several separate
  /// components. However, as a Svelte beginner I'm worried that will
  /// make it harder to debug. So for now, I'm keeping all this here
  /// so I can look at all the code together.
  import { session, page } from '$app/stores';

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
  import List, { Item, Text, Separator, Subheader } from '@smui/list';
  import { H6 } from '@smui/common/elements';
  import Autocomplete from '@smui-extra/autocomplete';
  import DMenuLink from '$lib/DMenuLink.svelte';

  let open = false;
  let active = $page.routeId?.split('/')[0] || '';
  let datasets = $session.datasets || [];
  let pageDataset = datasets.find(d => d.id == $page.params.datasetId);
  let selectedDataset = pageDataset;

  async function logout(e) {
    const response = await fetch('/logout', {
      method: 'GET',
      headers: {
	'Content-Type': 'application/json',
	'accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.log(await response.text());
      return;
    }

    // goto doesn't seem to reload session, so it still looks like the
    // user is logged in.
    ///goto('/');
    window.location = '/';
  }

</script>

<div class="all-but-footer">
  <header>
    <TopAppBar bind:this={topAppBar} variant="standard">
      <Row>
	<Section>
	  <IconButton class="material-icons" on:click={() => (open = !open)} >menu</IconButton>
	  {#if pageDataset }
	    <TopBarTitle>{pageDataset.name} > {active} </TopBarTitle>
	  {/if}
	</Section>
	<Section align="end" toolbar>
	  {#if $session.user }
	    <Button href='/logout' on:click$preventDefault={logout} ><Label>Logout</Label></Button>
	  {:else}
	    <Button href='/login'><Label>Login</Label></Button>
	{/if}
	  <IconButton class="material-icons" aria-label="Account">account_circle</IconButton>
    {#if $session.user }
    <Label>{$session.user.username}</Label>
    {/if}
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
	  <DrawerTitle >TED</DrawerTitle>
	  <!-- <Subtitle>Text Exploration Dashboard</Subtitle> -->
    <Autocomplete style="margin: 0.5em 0rem;" options={datasets} textfield$variant="outlined"
			bind:value={selectedDataset} label="Dataset" getOptionLabel={opt => opt?.name || ''} />
    <Separator />
	</Header>
	<Content>
	  <List>
	    <DMenuLink route="/upload" bind:active bind:open icon="upload" />
      <DMenuLink route={`/wrangle/${selectedDataset?._id || ''}`} text="wrangle" bind:active bind:open icon="tab_unselected" disabled={!Boolean(selectedDataset)} />
	    <DMenuLink route="/annotate" bind:active bind:open icon="new_label" disabled={!Boolean(selectedDataset)} />
	    <DMenuLink route="/explore" bind:active bind:open icon="explore" disabled={!Boolean(selectedDataset)} />
      <Separator />
      <Subheader component={H6}>Dashboards</Subheader>      
	    <DMenuLink route="/" bind:active bind:open text="(empty)" icon="bookmark" />
	  </List>
	</Content>
      </Drawer>

      <!-- Don't include fixed={false} if this is a page wide drawer.
           It adds a style for absolute positioning. -->
      <Scrim fixed={false} />
      <AppContent class="app-content">
	<main>
	  <slot/>
	</main>
      </AppContent>
    </div>
  </AutoAdjust>
</div> <!-- all-but-footer -->

<footer>
  Footer goes here.
</footer>

<style>
  .all-but-footer {
    min-height: calc(100vh - 1.5em);
  }

  /* These classes are only needed because the
    drawer is in a container on the page. */
  .drawer-container {
    display: flex;
    overflow: hidden;
    z-index: 0;
  }
  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  /* Google thinks tables shouldn't overflow? */
  :global(.mdc-data-table__table-container) {
    overflow: visible;
  } 

</style>
