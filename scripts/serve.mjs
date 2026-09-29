import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { build, root } from './build.mjs';
await build();
const directory=path.join(root,'dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.pdf':'application/pdf'};
http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    const filename=path.resolve(directory,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
    const relative=path.relative(directory,filename);
    if(relative.startsWith('..') || path.isAbsolute(relative)){res.writeHead(403);res.end();return;}
    const data=await readFile(filename);res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Nie znaleziono pliku.');}
}).listen(4173,'127.0.0.1',()=>console.log('Podgląd: http://127.0.0.1:4173 — po zmianach notes uruchom ponownie lub wykonaj build.'));
