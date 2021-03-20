#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { HasuraStack } from "../lib/hasura-stack";
import { CertificatesStack } from "../lib/certificates-stack";
import { VPCStack } from "../lib/vpc-stack";

const app = new cdk.App();
const multiAz = process.env.MULTI_AZ === "true";

const appName = process.env.APP_NAME;
if (!appName) {
  throw Error("APP_NAME must be defined in environment");
}

const region = process.env.AWS_REGION;
if (!region) {
  throw Error("AWS_REGION must be defined in environment");
}

const account = process.env.AWS_ACCOUNT_ID;
if (!account) {
  throw Error("AWS_ACCOUNT_ID must be defined in environment");
}

const env = {
  region,
  account,
};

const hostedZoneId = process.env.HOSTED_ZONE_ID;
if (!hostedZoneId) {
  throw Error("HOSTED_ZONE_ID must be defined in environment");
}

const hostedZoneName = process.env.HOSTED_ZONE_NAME;
if (!hostedZoneName) {
  throw Error("HOSTED_ZONE_NAME must be defined in environment");
}

const hasuraHostname = process.env.HASURA_HOSTNAME;
if (!hasuraHostname) {
  throw Error("HASURA_HOSTNAME must be defined in environment");
}

// default value for now
const hasuraCORSDomain =
  process.env.HASURA_GRAPHQL_CORS_DOMAIN ||
  "https://thestoryengine.co.uk, https://*.thestoryengine.co.uk";
if (!hasuraCORSDomain) {
  throw Error("HASURA_GRAPHQL_CORS_DOMAIN must be defined in environment");
}

const certificatesStack = new CertificatesStack(
  app,
  `${appName}-HasuraCertificatesStack`,
  {
    env,
    hostedZoneId,
    hostedZoneName,
    hasuraHostname,
  }
);

const vpcStack = new VPCStack(app, `${appName}-HasuraVPCStack`, { env });

new HasuraStack(app, `${appName}-HasuraStack`, {
  env,
  vpc: vpcStack.vpc,
  appName,
  certificates: certificatesStack.certificates,
  hostedZoneId,
  hostedZoneName,
  hasuraHostname,
  multiAz,
  hasuraCORSDomain,
});
