# Deno Client Server project template

Project template containing a server written in deno and a client written in typescript using typescript compiler.

The project structure try to be as simple as possible using deno and typescript only as build/running tool (no npm). 

It uses a **workspace.code-workspace** file as suggested by [denoland/vscode_deno](https://github.com/denoland/vscode_deno) extension:
[main/docs/workspaceFolders.md](https://github.com/denoland/vscode_deno/blob/main/docs/workspaceFolders.md)

Other repository like [TradeIdeasPhilip/deno-client-server-typescript-template](https://github.com/TradeIdeasPhilip/deno-client-server-typescript-template), evaluates similar configuration.  @TradeIdeasPhilip goes further and configure his workspace to work around some of the issues of the environment.

TODO:

 * [ ] Fix Deno VS code configuration
 * [ ] Debug Deno from VS code
 * [ ] Debug client from VS code
 * [x] Debug client from chrome
 * [ ] Add server/client tests
 * [ ] Implement a simple webcomponent using vanillajs and/or [Lit](https://lit.dev) to experience the configuration

## Launch the Server

```sh
cd server
deno run  --allow-read=../client/ --allow-net server.ts
```
