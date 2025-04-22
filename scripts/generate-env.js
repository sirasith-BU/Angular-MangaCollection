const fs = require("fs");
const path = "./src/environments/environment.prod.ts";

const apiUrl = process.env.API_URL;

const content = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};`;

fs.writeFileSync(path, content);
