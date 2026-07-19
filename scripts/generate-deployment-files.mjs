import { createDeploymentArtifactModule } from "./lib/deployment-artifacts.mjs";

await createDeploymentArtifactModule().generate();
console.log("Generated security and cache headers.");
