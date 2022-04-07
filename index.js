const { CognitoJwtVerifier } = require("aws-jwt-verify");
require('dotenv').config();

const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

console.log(userPoolId, clientId, token);

const verify = async () => {
  // Verifier that expects valid access tokens:
  const verifier = CognitoJwtVerifier.create({
    userPoolId,
    tokenUse: "access",
    clientId,
  });

  try {
    console.time("verify");
    const payload = await verifier.verify(
      token
    );
    console.timeEnd("verify");
    console.log("Token is valid. Payload:", payload);
  } catch {
    console.log("Token not valid!");
  }
};

verify();