const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

// Read config.json
function getConfig() {
  try {
    const configPath = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { error: 'Config not found' };
  }
}

// Write config.json
function saveConfig(config) {
  try {
    const configPath = path.join(__dirname, 'config.json');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
}

// Parse multipart form data for file upload
function parseMultipartForm(data, boundary) {
  const parts = {};
  const chunks = data.split(`--${boundary}`);

  chunks.forEach(chunk => {
    if (!chunk || chunk === '--\r\n' || chunk === '--') return;

    const [header, ...bodyParts] = chunk.split('\r\n\r\n');
    const body = bodyParts.join('\r\n\r\n').replace(/\r\n$/, '');

    const match = header.match(/name="([^"]+)"/);
    if (match) {
      const fieldName = match[1];
      parts[fieldName] = body;
    }
  });

  return parts;
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let filePath = '.' + parsedUrl.pathname;

  // Handle API routes
  if (parsedUrl.pathname === '/api/config') {
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(getConfig()));
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const config = JSON.parse(body);
          saveConfig(config);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
        } catch (err) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
    return;
  }

  // Handle file upload API
  if (parsedUrl.pathname === '/api/upload' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        // Parse multipart form data
        const contentType = req.headers['content-type'];
        const boundary = contentType.split('boundary=')[1];

        if (!boundary) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'No boundary found' }));
          return;
        }

        // Find the file in the form data
        const fileMatch = body.match(/Content-Disposition: form-data; name="file"; filename="([^"]+)"\r\nContent-Type: ([^\r\n]+)\r\n\r\n([\s\S]+?)(?=\r\n--)/);

        if (fileMatch) {
          const filename = fileMatch[1];
          const fileData = fileMatch[3];

          // Ensure assets directory exists
          const assetsDir = path.join(__dirname, 'assets');
          if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir);
          }

          // Save file
          const filepath = path.join(assetsDir, filename);
          // Remove any trailing boundary/carriage return from file data
          const cleanData = fileData.replace(/\r\n$/, '');

          // Detect if this is base64 or binary
          // For simplicity, we'll handle it as buffer
          const buffer = Buffer.from(cleanData, 'binary');
          fs.writeFileSync(filepath, buffer);

          res.setHeader('Content-Type', 'application/json');
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, path: `assets/${filename}` }));
        } else {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'No file found in request' }));
        }
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Serve admin panel
  if (parsedUrl.pathname === '/admin') {
    filePath = './admin.html';
  }

  // Default to index.html for root
  if (filePath === './') filePath = './index.html';

  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}/`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log(`🎨 Admin panel: http://localhost:${PORT}/admin\n`);
});
