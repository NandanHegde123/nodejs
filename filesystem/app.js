// const { unlink } = require("fs/promises");
const fs = require("fs/promises");

(async () => {
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

  //creating a new file if it doesn't exist
  const createFile = async (path) => {
    try {
      //to check if we have the file
      const existingFileHandler = await fs.open(path, "r");
      existingFileHandler.close();
      return console.log(`The file ${path} already exists}`);
    } catch (e) {
      const newFileHandler = await fs.open(path, "w");
      console.log("A new file was successfully creating");
      newFileHandler.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log(`successfully deleted file in ${path}`);
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log(`The file ${path} doesen't exist`);
      } else {
        console.log(e);
      }
    }
  };
  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log("Successfully renamed the path");
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log("No file at this path to rename");
      } else {
        console.log(e);
      }
    }
  };

  let addedContent;
  const addToFile = async (path, content) => {
    if (addedContent === content) return;
    try {
      const FileHandle = await fs.open(path, "a");
      const buff = Buffer.from(content, "utf-8");
      const offset = 0;
      const length = buff.byteLength;
      await FileHandle.write(buff, offset, length);
      addedContent = content;
      console.log("Successfully added content");
      FileHandle.close();
    } catch (e) {
      console.log(e);
    }
  };

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    //get size of the file, stat gives all stats
    const size = (await commandFileHandler.stat()).size;
    //allocate buffer with size
    const buff = Buffer.alloc(size);
    //the location from where we start filling our buffer
    const offset = 0;
    //length of the buffer
    const length = buff.byteLength;
    //the position we want start from in read
    const position = 0;

    await commandFileHandler.read(buff, offset, length, position);

    //saving as string in a variable
    const command = buff.toString("utf-8");
    console.log(command);

    //create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1).trim();
      createFile(filePath);
    }

    //delete a file:
    //delete  the path
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1).trim();
      deleteFile(filePath);
    }

    //rename file:
    //rename the file to new path
    if (command.includes(RENAME_FILE)) {
      const idx = command.indexOf(" to ");
      const oldFilePath = command.substring(RENAME_FILE.length + 1, idx);
      const newFilePath = command.substring(idx + 4).trim();
      renameFile(oldFilePath, newFilePath);
    }

    //add to file:
    //find file then add content
    if (command.includes(ADD_TO_FILE)) {
      const idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, idx);
      const content = command.substring(idx + 15);
      addToFile(filePath, content);
    }
  });

  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType == "change") {
      commandFileHandler.emit("change");
    }
  }
})();

//decoder 01=>meaningful
//encoder meaningful=>01
