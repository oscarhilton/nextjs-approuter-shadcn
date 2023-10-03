import React from "react";
import ProjectCard from "./ProjectCard";

interface Website {
  id: string;
  domain: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  apiKey: string;
  apiKeyIndex: string;
  email: string;
  enableAPIKey: boolean;
  loginAttempts: number;
  pages: string[];
}

interface Project {
  id: string;
  projectName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  website: Website;
}

interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  companyName: string;
  firstName: string;
  lastName: string;
  projects: Project[];
}

export default async function Page({ searchParams }: any) {
  const res = await getData(searchParams?.token)

    if (!res) {
      return <p>Loading...</p>;
    }

    const { user, token, exp } = res;

    if (user) {
        <>`${JSON.stringify({ user }, null, 2)}`</>
    }

    if (!user) {
      return (
        <>
          User has logged out. <a href="/login">Login?</a>
        </>
      );
    }

    const { email, role, companyName, firstName, lastName, projects } = user;

    return (
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="bg-gray-100 min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-semibold mb-4">Client Dashboard</h1>
            <p>
              <strong>Email:</strong> {email}
            </p>
            {companyName && (
              <p>
                <strong>Company:</strong> {companyName}
              </p>
            )}
            <p>
              <strong>Name:</strong> {firstName} {lastName}
            </p>
          </div>
        <div className="mt-6 container border-solid border-2 border-indigo-60 rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-5">Projects</h2>
          <div className="grid grid-cols-3 gap-5">
            {projects.map((project: Project, index: number) => (
              <ProjectCard key={`${project.id}` + index} project={project} />
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  }


  async function getData(token: string) {
    try {
      const res = await fetch("http://localhost:3000/api/users/me", {
        "headers": {
          "cookie": `payload-token=${token}`
        },
        "method": "GET"
      });
      const json =  await res.json()
      return json
    } catch (err) {
      throw new Error(err as any);
    }
  }