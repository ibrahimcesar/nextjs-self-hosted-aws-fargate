import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";

import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import path from "path";

class PokeService extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "PokeVPC", {
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "ingress",
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });

    const cluster = new ecs.Cluster(this, "PokeCluster", {
      clusterName: "PokeCluster",
      vpc: vpc,
    });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "PokeFargateService",
      {
        cluster: cluster,
        desiredCount: 2, // Default is 1,
        cpu: 512,
        memoryLimitMiB: 1024,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset(path.dirname(".")),
          containerPort: 3000,
        },
        publicLoadBalancer: true, // Default is false,
        assignPublicIp: true,
      }
    );
  }
}

export { PokeService };
