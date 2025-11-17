import http from 'http';

const PORT = process.env.PORT || 4000;

const buildResponse = (status, data, extraHeaders = {}) => ({
  status,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    ...extraHeaders
  },
  body: JSON.stringify(data)
});

const parseBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req
      .on('data', (chunk) => chunks.push(chunk))
      .on('end', () => {
        if (!chunks.length) {
          resolve({});
          return;
        }
        try {
          resolve(JSON.parse(Buffer.concat(chunks).toString('utf-8')));
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    const response = buildResponse(204, {});
    res.writeHead(response.status, response.headers);
    res.end();
    return;
  }

  if (req.url === '/api/login' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const token = `mock-token-${body.username || 'guest'}`;
      const response = buildResponse(200, {
        token,
        user: {
          username: body.username || 'guest'
        }
      });
      res.writeHead(response.status, response.headers);
      res.end(response.body);
    } catch (error) {
      const response = buildResponse(400, { message: '無法解析登入資訊' });
      res.writeHead(response.status, response.headers);
      res.end(response.body);
    }
    return;
  }

  if (req.url === '/api/profile' && req.method === 'GET') {
    const authHeader = req.headers['authorization'] || '';
    if (!authHeader.startsWith('Bearer ')) {
      const response = buildResponse(401, { message: '缺少授權資訊' });
      res.writeHead(response.status, response.headers);
      res.end(response.body);
      return;
    }

    const token = authHeader.replace('Bearer ', '');
    const now = new Date();
    const response = buildResponse(200, {
      displayName: token.replace('mock-token-', '').toUpperCase(),
      role: '系統管理員',
      loggedInAt: now.toLocaleString('zh-TW')
    });
    res.writeHead(response.status, response.headers);
    res.end(response.body);
    return;
  }

  if (req.url === '/api/about' && req.method === 'GET') {
    const response = buildResponse(200, {
      description: '我們是一支專注於打造教學示範專案的小型團隊。',
      focus: ['快速原型', '教學文章', '技術分享']
    });
    res.writeHead(response.status, response.headers);
    res.end(response.body);
    return;
  }

  const response = buildResponse(404, { message: 'Not Found' });
  res.writeHead(response.status, response.headers);
  res.end(response.body);
});

server.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
