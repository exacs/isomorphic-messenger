module.exports = {
  'plugins': [
    'react',
  ],
  'extends': 'airbnb',
  'rules': {
    'no-underscore-dangle': ['error', {
      'allow': ['__INITIAL_STATE__']
    }],
    'import/no-unresolved': 'off',
  }
}
