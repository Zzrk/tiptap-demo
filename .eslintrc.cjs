module.exports = {
  extends: ['react-app', 'prettier'],
  "import/no-anonymous-default-export": ["error", {
    "allowArray": false,
    "allowArrowFunction": false,
    "allowAnonymousClass": false,
    "allowAnonymousFunction": false,
    "allowCallExpression": true, // The true value here is for backward compatibility
    "allowLiteral": false,
    "allowObject": false
  }]
};