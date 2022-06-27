import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { getUser, addDataset } from '$lib/db';
import assert from 'node:assert/strict';

export async function post({ request, locals }) {
  const baseDir = path.normalize(path.join(process.cwd(), "..", "raw"));
  const username = locals.user.username;
  const existingDatasets = (await getUser(username)).accessibleDatasets;

  const data = await request.formData();
  
  const name = data.get('datasetName');
  const id = Date.now() + '-' + uuid();
  data.delete('datasetName');
  console.log(name);

  const fullPath = path.join(baseDir, id);
  assert(!fs.existsSync(fullPath));

  if (existingDatasets.includes(name)) {
    console.log(`${name} already exists!`);
    return {
      status: 409,
      body: {"error": `Dataset ${name} already exists.`}
    };
  }

  const pathInfo = JSON.parse(data.get('pathInfo'));
  data.delete('pathInfo');
  console.log(pathInfo);

  let fullInfo = {
    id, 
    name,
    path: fullPath,
    owner: username,
    readers: [],
    files: pathInfo
  }

  const metadataPath = path.join(fullPath, '.info.json');
  try {
    fs.mkdirSync(path.dirname(metadataPath), {recursive: true});
    fs.writeFileSync(metadataPath, JSON.stringify(fullInfo));
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      body: {"error": `Could not write metadata file ${metadataPath}`}
    };
  }

  for (const [origPath, file] of data) {
    str = file.toString();
    if (str !== "[object File]") {
      console.log(`[WARNING] Unexpected non-file in FormData: ${str}`);
      continue;
    }

    const info = pathInfo[origPath];
    const relPath = path.join(info.dirPath, info.filename);
    console.log(`---------- <${relPath}> [${info.type}] ----------`);
    // console.log(await file.text());
    
    const finalPath = path.join(fullPath, relPath);
    console.log(`Will write to ${finalPath}`);
    try {
      fs.mkdirSync(path.dirname(finalPath), {recursive: true});
      fs.createWriteStream(finalPath).write(Buffer.from(await file.arrayBuffer()));
    } catch (err) {
      console.log(err);
    }
    console.log(`---------- </${relPath}> ----------`);
  }

  console.log(`Adding dataset ${name} for ${username}`);
  console.log(fullInfo);
  addDataset(fullInfo);

  return {
    status: 200,
    body: {"text": "hello"}
  };
}
