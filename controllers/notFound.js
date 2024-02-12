export default function notFound(req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Sorry. Nothing found. Please use existing API.');
}
