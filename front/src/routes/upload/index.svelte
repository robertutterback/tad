<script context="module">
  export async function load({ session }) {
    if (!session?.user)
      return { status: 302, redirect: '/protected' };
    return { props: { user: session.user } };
  }
</script>

<script>
  import DatasetUpload from '$lib/upload/DatasetUpload.svelte';
  import FileView from '$lib/upload/FileView.svelte';
  import Fab, {Label as FabLabel, Icon} from '@smui/fab';
  import Textfield from '@smui/textfield';
  import Snackbar, { Actions, Label as SnackbarLabel } from '@smui/snackbar';
  import IconButton from '@smui/icon-button';

  let fileData = new Map();
  let fileInfo = new Map();
  let datasetName = 'test';
  let supportedFileTypes = new Set(['txt'])
  let unsupportedFileTypes = new Set(['pdf', 'docx', 'xlsx']);
  let uploadInfoSnackbar, uploadInfoText;

  async function uploadDataset() {

    if ((fileData.size != fileInfo.size) ||
	(Array.from(fileData.keys()).toString() != Array.from(fileInfo.keys()).toString())) {
      console.log(fileData.size);
      console.log(fileInfo.size);
      console.log(Array.from(fileData.keys()));
      console.log(Array.from(fileInfo.keys()));
      throw new Error("<fileData> vs. <fileInfo> mismatch.");
    }

    if (fileData.size === 0) {
      uploadInfoText = 'No files selected!'
      uploadInfoSnackbar.open();
      return;
    }

    
    let data = new FormData();
    for (var [fullPath, file] of Array.from(fileInfo)) {
      if (file.type == 'Unsupported') {
	const path = file.dirPath + file.filename;
	uploadInfoText = `File ${path} not uploaded (file type not supported).`;
	uploadInfoSnackbar.open();
      } else {
	data.append(fullPath, fileData.get(fullPath));
      }
    }
    data.append("datasetName", datasetName);

    // Some files are unsupported, so lets remove them from `fileInfo` first
    const uploaded = Array.from(fileInfo.keys()).filter(f => f.type != 'Unsupported');
    const realInfo = new Map(uploaded.map(k => [k, fileInfo.get(k)]))
    data.append("pathInfo", JSON.stringify(Object.fromEntries(realInfo)));

    const response = await fetch("/upload", {
      method: "POST",
      headers: [["accept", "application/json"]],
      body: data});

    if (!response.ok)
      throw new Error(`upload error: ${response.status}`);

    const text = await response.text();
    console.log(text);
  }

  function removeFile(event) {
    const path = event.detail;
    fileInfo.delete(path);
    fileData.delete(path);
    fileInfo = fileInfo; fileData = fileData; // trigger updates
  }
</script>


<svelte:head>
  <title>Upload A Dataset</title>
</svelte:head>

<form on:submit|preventDefault={uploadDataset}>
<Textfield style="width: 100%; margin: auto"
	   variant="outlined" bind:value={datasetName} label="Dataset Name" required />
<DatasetUpload {supportedFileTypes} {unsupportedFileTypes} bind:fileData bind:fileInfo />
<FileView bind:fileInfo on:removeFile={removeFile}/>
<div style="display: flex; justify-content: center;">
  <Fab type="submit" extended variant="raised" color="primary"
       style="width: 90%; margin-top: 1rem; "
       exited={fileInfo.size === 0}
       >
    
    <FabLabel>Upload</FabLabel>
    <Icon class="material-icons">upload</Icon>
  </Fab>
</div>
</form>

<Snackbar bind:this={uploadInfoSnackbar} labelText={uploadInfoText} timeoutMs={5000}>
  <SnackbarLabel />
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>
