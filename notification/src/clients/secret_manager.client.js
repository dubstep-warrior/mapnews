// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "prod/mapnews/secrets";

const client = new SecretsManagerClient({
  region: "ap-southeast-1",
});

export const getSecret = async () => {
  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      }),
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  try {
    const secret = JSON.parse(response.SecretString);
    Object.keys(secret).forEach((key) => {
      process.env[key] = secret[key];
    }); 
  } catch (err) {
    console.log("Fail to parse secret string");
  }
};
