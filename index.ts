import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import {
  databaseAccount,
  mongoDB,
  dmtBackendRegistry,
  dmtFrontendRegistry
} from './resources';

const appName = `${pulumi.getProject()}-${pulumi.getStack()}`;
const resourceGroupName = `${appName}-resourceGroup`;

const resourceGroup = new resources.ResourceGroup(resourceGroupName);

const cosmosdbAccount = databaseAccount(appName, resourceGroup.name);

const mongoDBConfig = mongoDB(appName, resourceGroup.name, cosmosdbAccount.name);

const dmtFrontendRegistryConfig = dmtFrontendRegistry(appName, resourceGroup.name);

const dmtBackendRegistryConfig = dmtBackendRegistry(appName, resourceGroup.name);

export const dmtFrontendRegistryUrl = dmtFrontendRegistryConfig.loginServer;
export const dmtBackendRegistryUrl = dmtBackendRegistryConfig.loginServer;