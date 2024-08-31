import path from "path";
import fs from "fs";

const filePath = (filename: string) => path.resolve(filename);
const fileBuff = (filename: string) => fs.readFileSync(filePath(filename));
const parsedFile = (filename: string) => JSON.parse(fileBuff(filename).toString());
const saveFile = (filename: string, data: string) => fs.writeFileSync(filename, data);
const imageBuffer = (path: string) => Buffer.from(fileBuff(path)).toString("base64");

export const files = {
    filePath,
    fileBuff,
    parsedFile,
    saveFile,
    imageBuffer
}