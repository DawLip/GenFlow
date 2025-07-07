export const services_config = {
  service_url:{
    gateway:'http://gateway:3000',

    rest:'http://api:3000',
    graphql:'http://graphql:3000',
    socketio:'http://socket.io:3000',

    auth:'http://auth:3000',
    auth_rpc:'auth:50051',

    user:'http://user:3000',
    user_rpc:'user:50051',

    mongodb: 'mongodb://mongodb:27017',

    loki: 'http://loki:3100'
  }
}
