import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
    if (global.userData && global.userData.token) {
      config.headers.Authorization = global.userData.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

const getFormData = object => {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
};

const ApiCall = async (
  method = 'post',
  body,
  url = '',
  headers = null,
  formData = false,
) => {
  const config = {
    method: method.toLowerCase(),
    timeout: 1000 * 60 * 2,
    url,
    headers,
  };

  if (
    body &&
    (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete')
  ) {
    config.params = body;
  } else if (body && method.toLowerCase() === 'post' && !formData) {
    config.data = body;
  } else if (body && method.toLowerCase() === 'post' && formData) {
    config.data = getFormData(body);
  } else {
    config.data = body;
  }

  try {
    const response = await axiosInstance(config);
    return {
      statusCode: response?.status,
      data: response?.data,
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 502 || error.response.status === 404) {
        // Handle specific error cases
      }
      if (error.response.data?.message) {
        // Handle specific error cases
      }
      return {
        statusCode: error.response.status,
        data: error.response.data,
      };
    }
    if (error.code === 'ECONNABORTED') {
      return {
        statusCode: 400,
      };
    }
    return {
      statusCode: 400,
    };
  }
};

export default ApiCall;
