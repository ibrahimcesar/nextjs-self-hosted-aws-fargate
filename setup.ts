import { App } from "aws-cdk-lib";
import { PokeService } from "./stack";

const app = new App();
new PokeService(app, "PokeService", {
  description: "Fargate + Next.js",
  stackName: "PokeStack",
});
app.synth();
