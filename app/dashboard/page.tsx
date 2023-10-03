import React from "react";
import Project from "./Project";
import payload from 'payload'

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

export default async function Page() {
    

    const logout = () => {
      try {
        fetch("/api/users/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        console.log(err);
    } 

    // if (!res) {
    //   return <p>Loading...</p>;
    // }

    const { user, token, exp } = res;

    if (user) {
        <>`${JSON.stringify({ user }, null, 2)}`</>
    }

    if (!user) {
    logout()
      return (
        <>
          User has logged out. <a href="/login">Login?</a>
        </>
      );
    }

    const { email, role, companyName, firstName, lastName, projects } = user;

    return (
      <div className="bg-gray-100 min-h-screen p-4">
        <button onClick={() => logout()}>logout</button>
        <div className="bg-gray-100 min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-semibold mb-4">Client Dashboard</h1>
            <p>
              <strong>Email:</strong> {email}
            </p>
            {/* <p><strong>Role:</strong> {role}</p> */}
            {companyName && (
              <p>
                <strong>Company:</strong> {companyName}
              </p>
            )}
            <p>
              <strong>Name:</strong> {firstName} {lastName}
            </p>
            {/* <p><strong>Token:</strong> {token.substring(0, 10)}...</p> */}
            {/* <p><strong>Token Expiry:</strong> {new Date(exp * 1000).toLocaleString()}</p> */}

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Projects</h2>
              <ul>
                {projects.map((project: Project, index: number) => (
                  <Project key={`${project.id}` + index} id={project.id} />
                ))}
              </ul>
            </div>
          </div>
        </div>{" "}
      </div>
    );
}}
