import fs from 'fs';
import path from 'path';

export async function post({ request }) {
  const baseDir = path.normalize(path.join(process.cwd(), "..", "raw"));
  const user = "userid";
  const prefix = `${user}__`;

  const data = await request.formData();
  
  const name = data.get('datasetName');
  const folder = prefix + name.replaceAll(' ', '_');
  data.delete('datasetName');
  console.log(name);

  if (fs.existsSync(path.join(baseDir, folder))) {
    console.log(`${folder} already exists!`);
    return {
      status: 409,
      body: {"error": `Dataset ${name} already exists.`}
    }
  }
  
  const pathInfo = JSON.parse(data.get('pathInfo'));
  data.delete('pathInfo');
  console.log(pathInfo);

  for (const [origPath, file] of data) {
    str = file.toString();
    if (str !== "[object File]") {
      console.log(`[WARNING] Unexpected non-file in FormData: ${str}`);
      continue;
    }
    
    console.log(`---------- <${origPath}> [${pathInfo[origPath].type}] ----------`);
    // console.log(await file.text());
    
    const finalPath = path.join(baseDir, folder, origPath);
    console.log(`Will write to ${finalPath}`);
    try {
      fs.mkdirSync(path.dirname(finalPath), {recursive: true});
      fs.createWriteStream(finalPath).write(Buffer.from(await file.arrayBuffer()));
    } catch (err) {
      console.log(err);
    }
    console.log(`---------- </${origPath}> ----------`);
  }

  return {
    status: 200,
    body: {"text": "hello"}
  };
}
