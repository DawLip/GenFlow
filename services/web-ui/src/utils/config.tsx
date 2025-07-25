const config = {
  urls: {
    protocol: 'http://',
    serverIp: 'localhost',
    serverPort: '3000',
    socketPort: '3010',

    server: '',
    socket: '',
    graphql: '', 
  },
};

config.urls.server = `${config.urls.protocol}${config.urls.serverIp}:${config.urls.serverPort}`;
config.urls.socket = `${config.urls.protocol}${config.urls.serverIp}:${config.urls.socketPort}`;
config.urls.graphql = `${config.urls.server}/graphql`;

export default config;