<script>
  import DataTable, {Head,Body,Cell,Pagination} from '@smui/data-table';
  import IconButton from '@smui/icon-button';
  import FileRow from '$lib/upload/FileRow.svelte';

  export let files;

  function remove(fullpath) {
    files.delete(fullpath);
    files = files; // trigger update
  }

  /// @TODO: Highlight unsupported files in red, note (tooltip) that they will not be uploaded.

  /// @TODO: allow changing path (just click to modify directory path)

  /// @TODO: allow sorting

  /// @TODO: pagination (or scrolling?)
  // let rowsPerPage = 2;
  // let currentPage = 0;

  // $: start = currentPage * rowsPerPage;
  // $: end = Math.min(start + rowsPerPage, items.length);
  // $: slice = items.slice(start, end);
  // $: lastPage = Math.max(Math.ceil(items.length / rowsPerPage) - 1, 0);
 
  // $: if (currentPage > lastPage) {
  //   currentPage = lastPage;
  // }

</script>

<div>
  <DataTable table$aria-label="File list" style="width: 100%;">
    <Head><FileRow>
	<Cell>Directory Path</Cell>
	<Cell>Filename</Cell>
	<Cell>Type</Cell>
	<Cell>Size</Cell>
	<Cell>Delete</Cell>
    </FileRow></Head>
    <Body>
      <!-- {#each Object.keys(files).map(k => files[k]) as file} -->
	{#each Array.from(files) as [path, info] (path) }
	  <FileRow>
	    <Cell style="width: 40%;">{info.dirpath}</Cell>
	    <Cell style="width: 40%;">{info.filename}</Cell>
	    <!-- Cleaner way to do this? -->
	    {#if info.type === "Unsupported"}
	      <Cell style="border: 0.2em solid red" >{info.type}</Cell>
	    {:else}
	      <Cell>{info.type}</Cell>
	    {/if}
	    <Cell>{info.size}</Cell>
	    <Cell><IconButton class="material-icons"
			      on:click={() => remove(path)}>
		delete
	    </IconButton></Cell>
	  </FileRow>
      {/each}
    </Body>
  </DataTable>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
  }
  .unsupported {
    border: 0.2em solid red;
  }
</style>
