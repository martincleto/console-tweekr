const queryString = (obj: any): string => 
    obj &&
    Object.keys(obj)
      .filter(key => typeof obj[key] !== 'object' && typeof obj[key] !== 'undefined')
      .map(key => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');

const parseJSON = (response: Response) =>
  response.text().then(text => (text ? JSON.parse(text) : null));

export interface RequestOptions {
  endpoint: string;
  params?: any;
  headers?: Headers;
  body?: any;
  method?: string;
}

export const doRequest = async (options: RequestOptions) => {
  const {
    endpoint,
    params,
    headers,
    body,
    method
  } = options;

  const { API_HOST } = window.process.env;
  let _params = '';

  if (params) {
    _params = (typeof params === 'string') ? `?${params}` : `?${queryString(params)}`; 
  }

  const url = `${API_HOST}/${endpoint}${_params}`;
  const defaultHeaders = new Headers();
  defaultHeaders.set('Content-Type', 'application/json');

  const response = await fetch(url, {
    method: method ? method : 'GET',
    headers: headers ? headers : defaultHeaders,
    body: body ? JSON.stringify(body) : null,
  });

  return parseJSON(response);
};
