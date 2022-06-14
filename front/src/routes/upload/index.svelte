<script>
  import DatasetUpload from '$lib/upload/DatasetUpload.svelte';
  import FileView from '$lib/upload/FileView.svelte';
  import Fab, {Label, Icon} from '@smui/fab';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';

  let files = new Map();
  let supportedFileTypes = new Set(['xlsx', 'docx', 'txt'])
  let unsupportedFileTypes = new Set(['pdf']);

</script>


<svelte:head>
  <title>Upload A Dataset</title>
</svelte:head>

<DatasetUpload {supportedFileTypes} {unsupportedFileTypes} bind:files />
<FileView bind:files />
<div style="display: flex; justify-content: center;">

<Fab extended variant="raised" color="primary"
     style="width: 90%; margin-top: 1rem; "
     exited={files.size === 0}
     >
  <Label>Upload</Label>
  <Icon class="material-icons">upload</Icon>
</Fab>

</div>
