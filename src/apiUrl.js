// eslint-disable-next-line import/no-mutable-exports
let apiUrl;

if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://localhost:8000';
} else {
  apiUrl = 'https://back-lookup.herokuapp.com';
}

export default apiUrl;

// const apiUrl = 'https://back-lookup.herokuapp.com';

// export default apiUrl;
