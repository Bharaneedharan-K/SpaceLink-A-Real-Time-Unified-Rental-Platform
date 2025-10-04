const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

/**
 * Verifies a Google ID token and returns the payload if valid.
 * @param {string} token - Google ID token
 * @returns {Promise<object>} - Decoded payload
 */
async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: [
      '471401453680-e7h4dbp214igd7bpa2agt29j4uspts2m.apps.googleusercontent.com'
    ]
  });
  return ticket.getPayload();
}

module.exports = verifyGoogleToken;
