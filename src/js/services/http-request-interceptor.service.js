(() => {

  'use strict';

  angular
  .module('winter')
  .factory('HttpRequestInterceptor', () => HttpRequestInterceptor);

  class HttpRequestInterceptor {
    static request(config) {
      config.headers = {
        'Authentication': 'OAuth oauth_consumer_key="tS6cGe76gSnTvwCz85VxN7KoM", oauth_nonce="d18f175dc0a3e307e3cabc9d53349c9a", oauth_signature="GXTiGQDt1H%2FqYbmB8%2F5k8dNtTOs%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1451266251", oauth_token="1605976506-SHQ25GBd0NsPQ2vWPOKnZszMHZ9tjPlXTpEGJQn", oauth_version="1.0"'
      };

      return config;
    }
  }
})();
