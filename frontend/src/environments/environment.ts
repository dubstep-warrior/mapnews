const base_api = 'localhost:8000';

export const environment = {
  production: false,
  endpoint_mapnews_backend_api: `http://${base_api}`,
  ws_endpoint_mapnews_backend_api: `ws://${base_api}/ws`,
};

// Localhost: http://localhost:8000
// Docker: localhost
