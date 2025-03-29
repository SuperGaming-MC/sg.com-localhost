const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define the port to run the server on
const PORT = 1100;

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
    
    // Handle root path
    if (pathname === '/' || pathname === '/index.html') {
        pathname = '/index.html';
    }
    
    // Fix the pathname for "where to find me" page - handle both versions of the URL
    if (pathname === '/where to find me.html' || pathname === '/where%20to%20find%20me.html') {
        pathname = '/where_to_find_me.html';
    }
    
    console.log('Requested path:', pathname); // For debugging
    
    // Get the file extension
    const ext = path.parse(pathname).ext;
    
    // Map file extensions to MIME types
    const map = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
    };
    
    // Read the file from the file system
    fs.readFile(__dirname + pathname, (err, data) => {
        if (err) {
            // If the file is not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found: ' + pathname);
            console.log('File not found:', pathname); // For debugging
            return;
        }
        
        // Set the content type based on file extension
        res.writeHead(200, { 'Content-Type': map[ext] || 'text/plain' });
        res.end(data);
        console.log('Successfully served:', pathname); // For debugging
    });
});

// Start the server and listen on all network interfaces
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Server is accessible to everyone on your network at http://YOUR_LOCAL_IP:${PORT}/`);
});
