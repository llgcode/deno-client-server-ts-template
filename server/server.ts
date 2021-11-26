import { hello } from "../shared/utils.ts";
import { serve } from "https://deno.land/std@0.116.0/http/server.ts";
import { posix as path } from "https://deno.land/std@0.116.0/path/mod.ts";
import * as log from "https://deno.land/std@0.106.0/log/mod.ts";

/** Configure log */
await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),
  },

  loggers: {
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

/** Display hello word from a shared library */
console.log(hello());

const BASE_PATH = path.toFileUrl(path.join(new URL('.', import.meta.url).pathname, "../client/"));
const addr = ":8080";
console.log(`http://localhost${addr}`);
console.log(`Serving directory: ${BASE_PATH}`);

/** Serve client folder */
serve(async (req) => {
  const p = new URL(req.url).pathname;
  const filePath = BASE_PATH + p;
  try {
    const res = await fetch(filePath);
    return new Response(res.body, {
      headers: {
        "Content-Type": getMimeTypeFromExtension(p)
      }
    });
  } catch (e) {
    if (e instanceof TypeError) {
      return new Response(null, { status: 404 });
    }
  }
  return new Response(null, { status: 500 });
}, {
  addr
});

const defaultCharset = "charset=UTF-8";

/** Returns mimetype parsing the file extension of a file path*/
function getMimeTypeFromExtension(filepath: string) {
  switch (path.extname(filepath)) {
    case ".js": return `application/javascript;${defaultCharset}`;
    case ".html": return `text/html;${defaultCharset}`;
  }
  log.debug(() => `Unrecognize mime type for file extension: ${path.extname(filepath)}`);
  return "application/octet-stream";
}
