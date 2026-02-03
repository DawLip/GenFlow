export const services_config = {
  service_url:{
    gateway_web_ui: 'http://localhost:3000',
    
    gateway:'http://gateway:3000',

    api:'http://api:3000',
    api_test:'http://api-test:3000',
    graphql:'http://graphql:3000',
    socketio:'http://socketio:3000',
    socketio_rpc:'socketio:50051',

    auth:'http://auth:3000',
    auth_rpc:'auth:50051',

    user:'http://user:3000',
    user_rpc:'user:50051',

    project:'http://project:3000',
    project_rpc:'project:50051',

    team:'http://team:3000',
    team_rpc:'team:50051',

    genworker:'http://genworker:3000',
    genworker_rpc:'genworker:50051',

    mongodb: 'mongodb://mongodb:27017',
    rabbitmq: 'amqp://rabbitmq:5672',
    redis:'redis://redis:6379',

    loki: 'http://loki:3100'
  }
}
