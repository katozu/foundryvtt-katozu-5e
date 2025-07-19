import { extractPack } from "@foundryvtt/foundryvtt-cli";
import { readdir } from 'fs/promises'

const srcDir = "src/packs/";
const buildDir = "build/katozu-5e/packs/";

const listDirectories = async (pth) => {
  const directories = (await readdir(pth, {withFileTypes: true}))
    .filter(dirent => dirent.isDirectory())
    .map(dir => dir.name);

  return directories;
}

const packs = await listDirectories(buildDir);

packs.forEach(async directory => {
    console.log("extracting " + buildDir + directory + " => " + srcDir + directory);
    await extractPack(buildDir + directory, srcDir + directory, {folders: true});
});
