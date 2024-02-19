"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";
import { Fira_Code } from "next/font/google";
import axios from "axios";

const socket = io("http://localhost:9002");

const firaCode = Fira_Code({ subsets: ["latin"] });

export default function Home() {
  const [repoURL, setURL] = useState<string>("");

  const [logs, setLogs] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const [projectId, setProjectId] = useState<string | undefined>();
  const [deployPreviewURL, setDeployPreviewURL] = useState<
    string | undefined
  >();

  const logContainerRef = useRef<HTMLElement>(null);

  const isValidURL: [boolean, string | null] = useMemo(() => {
    if (!repoURL || repoURL.trim() === "") return [false, null];
    const regex = new RegExp(
      /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\/)?$/
    );
    return [regex.test(repoURL), "Enter valid Github Repository URL"];
  }, [repoURL]);

  // const handleClickDeploy = useCallback(async () => {
  //   setLoading(true);

  //   const { data } = await axios.post(`http://localhost:9000/project`, {
  //     gitURL: repoURL,
  //     slug: projectId,
  //   });

  //   if (data && data.data) {
  //     const { projectSlug, url } = data.data;
  //     setProjectId(projectSlug);
  //     setDeployPreviewURL(url);

  //     console.log(`Subscribing to logs:${projectSlug}`);
  //     socket.emit("subscribe", `logs:${projectSlug}`);
  //   }
  // }, [projectId, repoURL]);

  const logss: any = [
    "Deployment process initiated for React.js application.",
    "Docker image creation started.",
    "Docker image successfully created and pushed to AWS ECR.",
    "Cloning GitHub repository for the React.js application.",
    "Project successfully cloned from GitHub.",
    "Installing dependencies for the React.js application.",
    "Dependencies installed successfully.",
    "Building React.js application.",
    "Build process completed without errors.",
    "Uploading build artifacts to S3 bucket.",
    "Build artifacts successfully uploaded to S3 bucket.",
    "Deployment to ECS cluster initiated.",
    "React.js application successfully deployed to ECS cluster.",
    "Reverse proxy configuration updated for optimal routing.",
    "Live domain updated to point to the deployed React.js application.",
    "Deployment process completed successfully.",
    "Installing npm package: react@latest",
    "npm WARN deprecated axios@0.21.1: Critical security vulnerability fixed in v0.21.2. For more information, see https://github.com/axios/axios/pull/3410",
    "Installing npm package: react-dom@latest",
    "npm WARN deprecated core-js@3.16.2: core-js@<3.3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.",
    "Installing npm package: lodash@latest",
    "Installing npm package: express@latest",
    "Installing npm package: webpack@latest",
    "npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142",
    "Installing npm package: jest@latest",
    "npm WARN deprecated chokidar@3.5.2: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.",
  ];

  const logsss = [...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss,...logss, ...logss, ...logss, ...logss, ...logss, ...logss]

  const handleClickDeploy = useCallback(async () => {
    setLoading(true);
    for (var log of logsss) {
      await setLogs((prev) => [...prev, log]);
      await logContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setLoading(false);
  }, []);

  const handleSocketIncommingMessage = useCallback((message: string) => {
    console.log(`[Incomming Socket Message]:`, typeof message, message);
    const { log } = JSON.parse(message);
    setLogs((prev) => [...prev, log]);
    logContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    socket.on("message", handleSocketIncommingMessage);

    return () => {
      socket.off("message", handleSocketIncommingMessage);
    };
  }, [handleSocketIncommingMessage]);

  return (
    <main
      className="flex justify-center items-center h-[100vh]"
      style={{ background: "white" }}
    >
      <div className="row">
        <div className="col">
          <div className="w-[600px]">
            <h4 style={{ color: "black" }}>
              This application automates the deployment of web applications
              (e.g., Angular, Next.js, React.js) from GitHub repositories to
              live domains. It utilizes Docker, AWS services (S3, ECR, ECS),
              Node.js, Socket.IO, and a reverse proxy for efficient deployment
              and real-time communication.
            </h4>
          </div>
        </div>
      </div>
      <div className="w-[600px]">
        <div className="flex justify-center items-center">
          <Github size={150} strokeWidth={3} style={{ color: "black" }} />
        </div>
        <span className="flex justify-start items-center gap-2">
          <Input
            disabled={loading}
            value={repoURL}
            onChange={(e) => setURL(e.target.value)}
            type="url"
            placeholder="Github URL"
          />
        </span>
        <div className="flex justify-center items-center">
          <Button
            style={{ background: "green", width: "50%" }}
            onClick={handleClickDeploy}
            disabled={!isValidURL[0] || loading}
            className="mt-3"
          >
            <h4>{loading ? "In Progress" : "Deploy"}</h4>
          </Button>
        </div>
        {deployPreviewURL && (
          <div className="mt-2 bg-slate-900 py-4 px-2 rounded-lg">
            <p>
              Preview URL{" "}
              <a
                target="_blank"
                className="text-sky-400 bg-sky-950 px-3 py-2 rounded-lg"
                href={deployPreviewURL}
              >
                {deployPreviewURL}
              </a>
            </p>
          </div>
        )}
        {logs.length > 0 && (
          <div
            className={`${firaCode.className} text-sm text-green-500 logs-container mt-5 border-green-500 border-2 rounded-lg p-4 h-[300px] overflow-y-auto`}
          >
            <pre className="flex flex-col gap-1">
              {logs.map((log, i) => (
                <code
                  ref={logs.length - 1 === i ? logContainerRef : undefined}
                  key={i}
                >{`> ${log}`}</code>
              ))}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
