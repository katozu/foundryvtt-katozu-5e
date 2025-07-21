import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { readdir, readFile, writeFile } from 'fs/promises';

const srcDir = "src/packs/";
const buildDir = "build/katozu-5e/packs/";
const srcModuleJson = 'src/module.json';
const buildModuleJson = 'build/katozu-5e//module.json';

const listDirectories = async (pth) => {
  const directories = (await readdir(pth, {withFileTypes: true}))
    .filter(dirent => dirent.isDirectory())
    .map(dir => dir.name);

  return directories;
};

const readJson = async (pth) => {
  const data = await readFile(pth);
  return JSON.parse(data);
}

const packs = await listDirectories(srcDir);

packs.forEach(async directory => {
    console.log("compiling " + srcDir + directory + " => " + buildDir + directory);
    await compilePack(srcDir + directory, buildDir + directory, {recursive: true});
});

const modulejson = await readJson(srcModuleJson);
modulejson['version'] = process.env.npm_package_version
await writeFile(buildModuleJson, JSON.stringify(modulejson, null, 2))
