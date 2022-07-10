import { NFTStorage, File } from "nft.storage";
import mime from "mime";
//import fs from "fs";

import path from "path";

const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVhYjY3QjA5NDAwRjk3RGU1NTA4MzQ2MUQ2ZjFjMGUxQjEzMmQ1QWQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzM4MzYzNjA3NSwibmFtZSI6ImhlYWx0aC1uZXQifQ.YZQnNhp2lHq7m9K3uuM2J4sYQ7D9jsa3TeE74D4xc4Y";

async function storeNFT(image, name, description) {
  //const image = await fileFromPath(imagePath)

  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  return nftstorage.store({
    image,
    name,
    description,
  });
}

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 3) {
    console.error(
      `usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`
    );
    process.exit(1);
  }

  const [imagePath, name, description] = args;
  const result = await storeNFT(imagePath, name, description);
  console.log(result);
}

export async function storeFile(image, name, description) {
  try {
    const result = await storeNFT(image, name, description);
    return { success: true, data: result };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}
