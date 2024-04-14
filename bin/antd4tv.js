#!/usr/bin/env node

require("v8-compile-cache");
require("../dist/cjs/cli.js")
  .run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
