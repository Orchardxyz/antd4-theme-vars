const archiver = require("archiver");
const fs = require("fs-extra");
const version = require("./package.json").version;

const distZipName = `dist-${version}.zip`;
const output = fs.createWriteStream(__dirname + `/${distZipName}`);
const archive = archiver("zip", {
  zlib: { level: 9 }, // 设置压缩级别。
});

output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log(
    "archiver has been finalized and the output file descriptor has closed."
  );
});

archive.on("warning", function (err) {
  if (err.code === "ENOENT") {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

archive.on("error", function (err) {
  throw err;
});

archive.pipe(output);
archive.directory(__dirname + "/dist", false);
archive.finalize();
