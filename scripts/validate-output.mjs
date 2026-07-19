import { createDeploymentArtifactModule } from "./lib/deployment-artifacts.mjs";

const result = await createDeploymentArtifactModule().validate();
console.log(`Validated ${result.htmlFileCount} HTML files with no broken internal links.`);
