<script>
  import { page } from '$app/stores';
  import DataTable, {Head,Body,Cell,Row} from '@smui/data-table';
  import { Item, Text } from '@smui/list';
  import Textfield from '@smui/textfield';
  import Fab, {Label as FabLabel, Icon as FabIcon} from '@smui/fab';
  import Select, { Option } from '@smui/select';

  import ApplyButton from '$lib/wrangle/ApplyButton.svelte';

  export let rawInfo;
  let wrangledInfo;
  let levelNames = [];
  let selected;

  function makeWrangled(raw) {
    levelNames = computeNumLevels(Object.values(raw.files));
    let wrangled = JSON.parse(JSON.stringify(raw)); // deep copy
    wrangled.levelNames = levelNames;
    for (let [path, f] of Object.entries(wrangled.files)) {
      if (['txt', 'docx'].includes(f.type)) {
        f.encoding = 'guess';
        f.articleSplitter = f.metadataSplitter = '';
      } else {
        f.articleColumnName = '';
        f.skipRows = 0;
      }
    }

    wrangled.files = Object.values(wrangled.files).sort(comp);
    wrangledInfo = wrangled;
  }
  $: if (rawInfo.error === undefined) makeWrangled(rawInfo);

  function computeNumLevels(infos) {
    let lnames = [];
    let level = 1;
    for (let file of infos) {
      const num = file.dirPath.split('/').length - 2;
      while (num > lnames.length) {
        lnames.push(`Level ${level}`);
        level++;
      }
    }
    return lnames;
  }

  function comp(a,b) {
    const p1 = a.dirPath + a.filename;
    const p2 = b.dirPath + b.filename;
    const depth1 = p1.split('/').length;
    const depth2 = p2.split('/').length;
    if (depth1 < depth2) return -1;
    if (depth1 > depth2) return 1;
    if (p1 < p2) return -1;
    if (p1 > p2) return 1;
    return 0;
  }

  function applyLevel(propName, proto, levelIndex) {
    const match = proto.dirPath.split('/')[levelIndex+1];
    if (!match) return;
    for (let f of wrangledInfo.files) {
      if (f.type !== proto.type) continue;
      const current = f.dirPath.split('/')[levelIndex+1];
      if (!current) continue;
      if (match === current && !f[propName])
        f[propName] = proto[propName];
    }
    wrangledInfo = wrangledInfo; // trigger update
  }

  function applyPrefix(propName, proto, prefix) {
    for (let f of wrangledInfo.files) {
      if (f.type !== proto.type) continue;
      if (f.dirPath.startsWith(prefix) && !f[propName])
        f[propName] = proto[propName];
    }
    wrangledInfo = wrangledInfo; // trigger update
  }

  async function submitWrangle() {
        const response = await fetch(`/wrangle/${$page.params.datasetId}`, {
      method: "POST",
      headers: {
	              'Content-Type': 'application/json',
                'accept': 'application/json'
                },
      body: JSON.stringify(wrangledInfo)});

    if (!response.ok) {
      const text = (await response.json()).error;
      throw new Error(`upload error: ${response.status} -- ${text}`);
    }

    const text = await response.json();
    console.log(text);
  }

function handleBlur(e) {
  if (e.currentTarget.contains(e.relatedTarget)) return;
  selected = '';
}
</script>


{#if rawInfo.error}
<p style="color: red">{rawInfo.error}</p>
{:else}

<form on:submit|preventDefault={submitWrangle} style="overflow: visible;">
<h2 style="text-align: center">{rawInfo.name}</h2>

<DataTable table$aria-label="File list" style="width: 100%;">
  <Head><Row>
    <Cell>
      {#if levelNames.length}
        {#each levelNames as lname, i}
          / <Textfield style="width: 10rem;" label={`Level ${i+1} Name`} bind:value={lname} required/>
        {/each}/
      {:else}
        Folder Hierarchy
      {/if}
    </Cell>

    <Cell>Filename</Cell>
    <Cell>Type/Encoding</Cell>
    <Cell>Article Info</Cell>
    <Cell>Metadata Info</Cell>
  </Row>
  </Head>
  <Body>
      {#each wrangledInfo.files as file (file.origPath)}
      <Row class="{(file.type === 'txt') ? '' : 'nontext'}">
        <Cell>{file.dirPath}</Cell>
        <Cell>{file.filename}</Cell>
        <Cell style="overflow: visible;" on:focusin={() => selected = `${file.origPath}/encoding`} on:focusout={(e) => handleBlur(e)}>{file.type}
        {#if file.type === "txt"}
          / <Select bind:value={file.encoding} label="Encoding" >
            <Option value="guess" selected>Auto guess</Option>
            <Option value="utf8">UTF-8</Option>
            <Option value="cp1252">CP-1252 (Windows)</Option>
            <Option value="iso8859">ISO-8859-1</Option>
          </Select>
          {#if selected === `${file.origPath}/encoding`}
            <ApplyButton disabled={!Boolean(file.encoding)}>
              <Item on:SMUI:action={() => applyPrefix('encoding', file, '/')}><Text>All text files</Text></Item>
              <Item on:SMUI:action={() => applyPrefix('encoding', file, file.dirPath)}><Text>All below</Text></Item>
              {#each levelNames as lname, i}
                <Item on:SMUI:action={() => applyLevel('encoding', file, i)}><Text>All {lname}</Text></Item>
              {/each}
            </ApplyButton>
          {/if}
        {/if}
        </Cell>
        <Cell style="overflow: visible;" on:focusin={() => selected = `${file.origPath}/article`} on:focusout={(e) => handleBlur(e)}>
        {#if file.type === 'txt'}
          <Textfield style="width: 10rem;" label='Article Splitter' bind:value={file.articleSplitter} required />
          {#if selected === `${file.origPath}/article`}
            <ApplyButton disabled={!Boolean(file.articleSplitter)} on:focusin={() => selected = `${file.origPath}/article`}>
              <Item on:SMUI:action={() => applyPrefix('articleSplitter', file, '/')}><Text>All text files</Text></Item>
              <Item on:SMUI:action={() => applyPrefix('articleSplitter', file, file.dirPath)}><Text>All below</Text></Item>
              {#each levelNames as lname, i}
                <Item on:SMUI:action={() => applyLevel('articleSplitter', file, i)}><Text>All {lname}</Text></Item>
              {/each}
            </ApplyButton>
          {/if}
        {:else if file.type === 'xlsx'}
          <Textfield style="width: 10rem;" label='Article Column Name' bind:value={file.articleColumnName} required
          />
          {#if selected === `${file.origPath}/article`}
            <ApplyButton disabled={!Boolean(file.articleColumnName)}>
              <Item on:SMUI:action={() => applyPrefix('articleColumnName', file, '/')}><Text>All text files</Text></Item>
              <Item on:SMUI:action={() => applyPrefix('articleColumnName', file, file.dirPath)}><Text>All below</Text></Item>
              {#each levelNames as lname, i}
                <Item on:SMUI:action={() => applyLevel('articleColumnName', file, i)}><Text>All {lname}</Text></Item>
              {/each}
            </ApplyButton>
          {/if}
        {/if}
        </Cell>
        <Cell style="overflow: visible;" on:focusin={() => selected = `${file.origPath}/metadata`} on:focusout={(e) => handleBlur(e)}>
          {#if file.type === 'txt'}
          <Textfield style="width: 10rem;" label='Metadata Splitter' bind:value={file.metadataSplitter}/>
          {#if selected === `${file.origPath}/metadata`}
            <ApplyButton disabled={!Boolean(file.metadataSplitter)}>
              <Item on:SMUI:action={() => applyPrefix('metadataSplitter', file, '/')}><Text>All text files</Text></Item>
              <Item on:SMUI:action={() => applyPrefix('metadataSplitter', file, file.dirPath)}><Text>All below</Text></Item>
              {#each levelNames as lname, i}
                <Item on:SMUI:action={() => applyLevel('metadataSplitter', file, i)}><Text>All {lname}</Text></Item>
              {/each}
            </ApplyButton>
          {/if}
          {/if}
        </Cell>
      </Row>
    {/each}
  </Body>
</DataTable>

<div style="display: flex; justify-content: center;">
  <Fab type="submit" extended variant="raised" color="primary"
       style="width: 90%; margin-top: 1rem; "
       >
    <FabLabel>Wrangle</FabLabel>
    <FabIcon class="material-icons">cleaning_services</FabIcon>
  </Fab>
</div>
</form>

{/if}

<style>
:global(.nontext) {
  background-color: #ff3e0020;
}
</style>