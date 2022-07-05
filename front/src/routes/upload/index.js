import fs from 'fs';
import path from 'path';
import { getUser, addDataset, getAccessibleDatasets } from '$lib/db';
import assert from 'node:assert/strict';
import { ObjectId } from 'mongodb';

const baseDir = path.normalize(path.join(process.cwd(), "..", "data", "raw"));
async function uploadFiles(fullPath, pathInfo, data) {
  assert(!fs.existsSync(fullPath));

  for (const [origPath, file] of data) {
    str = file.toString();
    if (str !== "[object File]") {
      console.log(`[WARNING] Unexpected non-file in FormData: ${str}`);
      continue;
    }

    const info = pathInfo[origPath];
    const relPath = path.join(info.dirPath, info.filename);
    console.log(`---------- <${relPath}> [${info.type}] ----------`);
    
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
}

export async function post({ request, locals }) {
  const username = locals.user.username;
  const existingDatasets = await getAccessibleDatasets(username);

  // Note: for all non-file entries in data, you should remove them after
  // processing. This way, when we start processing files we can assert that
  // everything is a file.
  const data = await request.formData();
  
  const name = data.get('datasetName');
  data.delete('datasetName');
  console.log(name);
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

  let id = new ObjectId();
  const fullPath = path.join(baseDir, id.toString())
  let fullInfo = {
    _id: id,
    name,
    owner: username,
    readers: [],
    files: pathInfo
  };
  

  try {
    uploadFiles(fullPath, pathInfo, data);
    
    console.log(`Adding dataset ${name} for ${username}`);
    const result = await addDataset(fullInfo);
    assert(id.toString() == result.insertedId.toString());
    console.log(`${id}: ${fullInfo}`);

    return {
      status: 200,
      body: {"text": "hello"}
    };
  } catch (err) {
    console.log(err);
    fs.rmSync(fullPath, {recursive: true, force: true});
    return {
      status: 500,
      body: {"error": err}
    }
  }

  
  
}
