import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const routes = ["servicos", "a-kairos", "cases", "conteudos", "contato"];

for (const route of routes) {
  const targetDir = join(dist, route);
  mkdirSync(targetDir, { recursive: true });
  copyFileSync(join(dist, "index.html"), join(targetDir, "index.html"));
}

copyFileSync(join(dist, "index.html"), join(dist, "404.html"));
