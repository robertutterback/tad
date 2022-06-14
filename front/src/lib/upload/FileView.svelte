<script>
  import { createEventDispatcher } from 'svelte';
  
  import DataTable, {Head,Body,Cell,Pagination} from '@smui/data-table';
  import IconButton from '@smui/icon-button';
  import FileRow from '$lib/upload/FileRow.svelte';
  import Tooltip, { Wrapper } from '@smui/tooltip';

  const dispatch = createEventDispatcher();

  export let fileInfo;
</script>

{#if fileInfo.size > 0 }
<div>
  <DataTable table$aria-label="File list">
    <Head><FileRow>
	<Cell>Directory Path</Cell>
	<Cell>Filename</Cell>
	<Cell>Type</Cell>
	<Cell>Size</Cell>
	<Cell>Delete</Cell>
    </FileRow></Head>
    <Body>
      {#each Array.from(fileInfo) as [path, info] (path) }
	<Wrapper>
	  <FileRow class="{info.type === 'Unsupported' ? 'unsupported' : ''}">
	    <Cell style="width: 40%;">{info.dirPath}</Cell>
	    <Cell style="width: 20%;">{info.filename}</Cell>
	    <Cell>{info.type}</Cell>
	  <Cell>{info.size}</Cell>
	  <Cell><IconButton class="material-icons"
			      on:click={() => dispatch('removeFile', path)}>
		delete
	    </IconButton></Cell>
	  </FileRow>
	  {#if info.type === 'Unsupported'}
	    <Tooltip>File type not supported; will not be uploaded.</Tooltip>
	  {/if}
	</Wrapper>
      {/each}
    </Body>
  </DataTable>
</div>
{/if}

<style>
  div {
    display: flex;
    justify-content: center;
  }
  :global(table) {
    overflow: hidden;
    border-collapse: collapse;
    box-sizing: border-box;
    width: 100%;
  }
  :global(.unsupported) {
    border: 0.2em solid var(--mdc-theme-primary, #ff3e00);
    background-color: var(--mdc-theme-secondary, #676778);
    opacity: 0.5;
  }
</style>
