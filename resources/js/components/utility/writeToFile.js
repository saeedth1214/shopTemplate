import config from "../services/config";
// import writeFileP from "write-file-p";

export const writeToFile = fileName => {

    // const RandomNumber = generateRandom();
    const name = fileName.split(".");
    const strCode = generateCode(fileName, name[0]);

    writeFileP();

}

// const generateRandom = () => {

//     const d = new Date();
//     return Math.floor(Math.random * d.getSeconds());
// }

const generateCode = (fileName, name) => {

    return `import p${name} from ${config.BASE_IMG_PATH}${fileName}`;
}