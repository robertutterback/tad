<script>
  import Paper, { Title, Subtitle } from '@smui/paper';
  import { Graphic } from '@smui/list';
  import Ripple from '@smui/ripple';
  import Checkbox from '@smui/checkbox';
  import FormField from '@smui/form-field';
  
  export let files;
  export let supportedFileTypes, unsupportedFileTypes;
  let includeTopLevelFolder = false;

  function prettySize(size) {
    const suffixes = new Map([['GB', 1024**3], ['MB', 1024**2],
			      ['KB', 1024], ['B', 1]]);
    for (const [suffix, val] of suffixes) {
      if (size >= val)
	return `${(size/val).toFixed(2)} ${suffix}`;
    }
    return '(empty)';
  }

  function guessType(filename) {
    const ext = filename.split('.').at(-1);
    if (unsupportedFileTypes.has(ext))
      return 'Unsupported';
    if (supportedFileTypes.has(ext))
      return ext;
    return 'Unknown';
  }

  function transform(file) {
    const path = file.webkitRelativePath || '/' + file.name;
    const parts = path.split('/');
    const dirpath = parts.slice(0,-1).join('/') + '/';
    const filename = parts.at(-1);
    const size = prettySize(file.size);
    const type = guessType(filename);
    return {dirpath, filename, path: dirpath+filename, size, type};
  }
  
  /* type DataFile {
       dirpath: string,
       filename: string,
       path: string, // dirpath + filename
       size: numeric,
       type: string // just a guess
     }
  */
  function addFiles(filelist) {
    for (var file of filelist) {
      const f = transform(file);
      if (!files.has(f.path))
	files.set(f.path, f);
    }
    files = files; // trigger update
  }

  let fileInputRef, folderInputRef;
  function openFileDialog(inputRef) {
    inputRef.click();
  }

  function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target.webkitEntries);
    addFiles(e.dataTransfer.files);
  }
  function stopProp(e) {e.stopPropagation(); e.preventDefault();}
  function addFolder(e) {
    addFiles(e.target.files);
  }
  function innerCheck(e) {
    includeTopLevelFolder = !includeTopLevelFolder;
  }
</script>

<div class="zone-container">
    <Paper elevation=7 use={[[Ripple, {surface: true}]]}
	   style="text-align: center; width: 100%; margin: 1%" color="secondary"
	   on:dragenter={stopProp} on:dragover={stopProp} on:drop={handleDrop}
           on:click={() => openFileDialog(fileInputRef)}>
      <Title>
	<Graphic style="color: inherit; margin-right: 1%;"
		 class="material-icons" aria-hidden="true">description</Graphic>
	File(s)
      </Title>
      <Subtitle>Drag-and-drop files or click to browse.</Subtitle>
      <input type="file" multiple style="display: none;" bind:this={fileInputRef}
	     on:change={(e) => addFiles(e.target.files)} />
    </Paper>
    <Paper variant="outlined" elevation=7 use={[[Ripple, {surface: true}]]}
	   style="text-align: center; width: 100%; margin: 1%" color="secondary"
	   on:dragenter={stopProp} on:dragover={stopProp} on:drop={handleDrop}
	   on:click={() => openFileDialog(folderInputRef)}>
      <Title>
	<Graphic style="color: inherit; margin-right: 1%;"
		 class="material-icons" aria-hidden="true">folder</Graphic>
	Folder
      </Title>
      <Subtitle>Drag-and-drop a folder or click to browse.</Subtitle>
      <!-- Need specific click handlers to prevent the upload dialog from opening. -->
      <FormField on:click$stopPropagation >
	<Checkbox on:click={innerCheck} />
	<span slot="label" on:click$stopPropagation={innerCheck}>
	  Include top-level folder name in path
	</span>
      </FormField>
      <input type="file" webkitdirectory style="display: none;" bind:this={folderInputRef}
	     on:change={addFolder}/>
    </Paper>
</div>

<style>
  .zone-container {
    display: flex;
    justify-content: space-around;
  }
</style>
