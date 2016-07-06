module.exports = {
  'plugins': [
    'react',
  ],
  'extends': 'airbnb',
  'rules': {
    'no-underscore-dangle': [2, {
      'allow': ['__INITIAL_STATE__']
    }],
    'import/no-unresolved': 'off',
  }
}
