import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { readdir } from 'fs/promises'

const srcDir = "src/packs/";
const buildDir = "build/katozu-5e/packs/";

const listDirectories = async (pth) => {
  const directories = (await readdir(pth, {withFileTypes: true}))
    .filter(dirent => dirent.isDirectory())
    .map(dir => dir.name);

  return directories;
}

const packs = await listDirectories(srcDir);

packs.forEach(async directory => {
    console.log("compiling " + srcDir + directory + " => " + buildDir + directory);
    await compilePack(srcDir + directory, buildDir + directory, {recursive: true});
});



// await compilePack("src/packs/classes", "build/katozu-5e/packs/classes", {recursive: true});
// await compilePack("src/packs/actors", "build/katozu-5e/packs/actors", {recursive: true});
// await compilePack("src/packs/rules", "build/katozu-5e/packs/rules", {recursive: true});
// await compilePack("src/packs/spells", "build/katozu-5e/packs/spells", {recursive: true});