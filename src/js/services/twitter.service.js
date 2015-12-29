(() => {
  const Twitter = require('twitter');

  angular
  .module('winter')
  .factory('Twitter', () => {
    return new Twitter({
      consumer_key: 'tS6cGe76gSnTvwCz85VxN7KoM',
      consumer_secret: 'JGhwA8WXsfz7fyv2pvc47PmZ6NlqBMMjhWKdHx0w3fTfumCMUX',
      access_token_key: '1605976506-SHQ25GBd0NsPQ2vWPOKnZszMHZ9tjPlXTpEGJQn',
      access_token_secret: 'P4cZVmh5mHfvdJDiK5mOO2KCzjReGyu8hNWrJIbt9rxmF',
    });
  });
})();
