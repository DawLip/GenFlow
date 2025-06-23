const fetchServer = async (url: string, body:any, options: RequestInit = {}) => {
  const baseUrl = process.env.MAIN_SERVER_URL || 'http://localhost:3010';
  const response = await fetch(`${baseUrl}/${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(body),
  });

  if(!response.ok) throw new Error(`HTTP error! status: ${response.status} ${response}`);

  return response.json();
}

export default fetchServer;