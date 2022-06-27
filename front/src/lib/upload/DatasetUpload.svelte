<script>
  import Paper, { Title, Subtitle } from '@smui/paper';
  import { Graphic } from '@smui/list';
  import Ripple from '@smui/ripple';
  import Checkbox from '@smui/checkbox';
  import FormField from '@smui/form-field';
  
  export let fileData, fileInfo;
  export let supportedFileTypes, unsupportedFileTypes;
  let includeTopLevelFolder = true;

  async function entryAsFile(entry) {
    let file = await new Promise((resolve,reject) => {
      entry.file(file => {
	      resolve(file);
      }, err => reject(err));
    });
    file.fullPath = entry.fullPath
    return file;
  }

  // https://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree
  // --- begin stackoverflow ---
  // Drop handler function to get all files. Use BFS to traverse
  // entire directory/file structure
  async function getAllFileEntries(dataTransferItemList) {
    let droppedFiles = [];
    let queue = [];
    // Unfortunately dataTransferItemList is not iterable i.e. no forEach
    for (let i = 0; i < dataTransferItemList.length; i++) {
      queue.push(dataTransferItemList[i].webkitGetAsEntry());
    }
    while (queue.length > 0) {
      let entry = queue.shift();
      if (entry.isFile) {
	droppedFiles.push(await entryAsFile(entry));	
      } else if (entry.isDirectory) {
	let reader = entry.createReader();
	queue.push(...await readAllDirectoryEntries(reader));
      }
    }
    return droppedFiles;
  }

  // Get all the entries (files or sub-directories) in a directory by calling readEntries until it returns empty array
  async function readAllDirectoryEntries(directoryReader) {
    let entries = [];
    let readEntries = await readEntriesPromise(directoryReader);
    while (readEntries.length > 0) {
      entries.push(...readEntries);
      readEntries = await readEntriesPromise(directoryReader);
    }
    return entries;
  }

  // Wrap readEntries in a promise to make working with readEntries easier
  async function readEntriesPromise(directoryReader) {
    try {
      return await new Promise((resolve, reject) => {
	directoryReader.readEntries(resolve, reject);
      });
    } catch (err) {
      console.log(err);
    }
  }

  // --- end stackoverflow

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

  function getInfo(file) {
    const origPath = file.fullPath || file.webkitRelativePath || '/' + file.name;
    const parts = origPath.split('/');
    parts.shift(); // should start with /
    if (!includeTopLevelFolder)
      parts.shift();
    const dirPath = (parts.length == 1) ? '/' : '/' + parts.slice(0,-1).join('/') + '/';
    const filename = parts.at(-1);
    const size = prettySize(file.size);
    const type = guessType(filename);
    return {origPath, dirPath, filename, size, type};
  }
  
  /* type DataFile {
       origPath: string,
       dirPath: string, // dirpath + filename
       filename: string,
       size: numeric,
       type: string // just a guess
     }
  */
  function addFiles(filelist) {
    for (var file of filelist) {
      const info = getInfo(file);
      if (!fileInfo.has(info.origPath)) {
	fileInfo.set(info.origPath, info);
	fileData.set(info.origPath, file);
      }
    }
    fileInfo = fileInfo; fileData = fileData; // trigger updates
  }

  let fileInputRef, folderInputRef;
  function openFileDialog(inputRef) {
    inputRef.click();
  }

  async function handleDrop(e) {
    let items = await getAllFileEntries(event.dataTransfer.items);
    addFiles(items);
  }
  
  function innerCheck(e) {
    includeTopLevelFolder = !includeTopLevelFolder;
  }
</script>

<div class="zone-container">
    <Paper elevation=7 use={[[Ripple, {surface: true}]]}
	   style="text-align: center; width: 100%; margin: 1%" color="secondary"
	   on:dragenter$preventDefault on:dragover$preventDefault
	   on:drop$preventDefault={handleDrop}
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
	   on:dragenter$preventDefault on:dragover$preventDefault
	   on:drop$preventDefault={handleDrop}
	   on:click={() => openFileDialog(folderInputRef)}>
      <Title>
	<Graphic style="color: inherit; margin-right: 1%;"
		 class="material-icons" aria-hidden="true">folder</Graphic>
	Folder
      </Title>
      <Subtitle>Drag-and-drop a folder or click to browse.</Subtitle>
      <!-- Need specific click handlers to prevent the upload dialog from opening. -->
      <FormField on:click$stopPropagation >
	<Checkbox on:click={innerCheck} bind:checked={includeTopLevelFolder} />
	<span slot="label" on:click$stopPropagation={innerCheck}>
	  Include top-level folder name in path
	</span>
      </FormField>
      <input type="file" webkitdirectory style="display: none;" bind:this={folderInputRef}
	     on:change={(e) => addFiles(e.target.files)}/>
    </Paper>
</div>

<style>
  .zone-container {
    display: flex;
    justify-content: space-around;
  }
</style>
