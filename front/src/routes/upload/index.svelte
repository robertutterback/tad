
<script>
  import DatasetUpload from '$lib/upload/DatasetUpload.svelte';
  import FileView from '$lib/upload/FileView.svelte';

  let files = new Map();
  let supportedFileTypes = new Set(['xlsx', 'docx', 'txt'])
  let unsupportedFileTypes = new Set(['pdf']);

</script>


<svelte:head>
  <title>Upload A Dataset</title>
</svelte:head>

<DatasetUpload {supportedFileTypes} {unsupportedFileTypes} bind:files />
<FileView bind:files />

