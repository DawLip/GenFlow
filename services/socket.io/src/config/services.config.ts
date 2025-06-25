export const serviceRoutes = {
  rest: process.env.REST_SERVICE_URL || 'http://localhost:3001',
  graphql: process.env.GRAPHQL_SERVICE_URL || 'http://localhost:3002',
  socket: process.env.SOCKET_SERVICE_URL || 'http://localhost:3003',
};
