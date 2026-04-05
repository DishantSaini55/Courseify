const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// We use ClerkExpressRequireAuth to protect both user and admin routes.
// We can differentiate roles inside the route handler if needed based on req.auth
const userAuthentication = ClerkExpressRequireAuth();
const adminAuthentication = ClerkExpressRequireAuth();

module.exports = { adminAuthentication, userAuthentication };