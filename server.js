const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);

  // If request contains .html, 301 redirect to clean URL without .html
  if (reqPath.endsWith('.html')) {
    let cleanPath = reqPath.slice(0, -5);
    if (cleanPath === '/index' || cleanPath === '') {
      cleanPath = '/';
    }
    const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
    res.writeHead(301, {
      'Location': cleanPath + query,
      'Content-Type': 'text/plain'
    });
    res.end('Redirecting to clean URL without .html');
    return;
  }

  // Handle root
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Path resolution
  let filePath = path.normalize(path.join(BASE_DIR, reqPath));

  // Security: prevent path traversal
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    let actualFile = filePath;

    if (err) {
      // If no file extension in request (e.g. /about, /services, /clients)
      if (!path.extname(reqPath)) {
        const htmlPath = filePath + '.html';
        if (fs.existsSync(htmlPath)) {
          actualFile = htmlPath;
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found: ' + reqPath);
          return;
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found: ' + reqPath);
        return;
      }
    } else if (stats.isDirectory()) {
      actualFile = path.join(filePath, 'index.html');
    }

    fs.readFile(actualFile, (readErr, data) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(actualFile).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Dream Peak Server running at http://localhost:${PORT}/ (Clean URLs enabled)`);
});
