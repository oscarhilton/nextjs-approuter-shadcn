"use client"

import Cookie from 'js-cookie';
import React, { useEffect, useState } from 'react';

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
  
  interface DashboardData {
    message: string;
    user: User;
    token: string;
    exp: number;
  }

const Dashboard: React.FC<{ data: DashboardData }> = () => {
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState<any>(null);

  const logout = () => {
    try {
        fetch('/api/users/logout', {
            method: "POST", 
            credentials: "include",
            headers: {
               "Content-Type": "application/json",
            },
        })
        window.location.href = '/'
    } catch (e) {
        console.log(e)
    }
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users/me');
        const result = await response.json();
        setRes(result);
      } catch (error) {
        setErr(error);
      }
    };

    fetchData();
  }, []);

  if (!res) {
    return <p>Loading...</p>;
  }

  if (err) {
    return <pre>{JSON.stringify({ err }, null, 2)}</pre>;
  }

  const { user, token, exp } = res;

  if (!user) {
    return <>User has logged out. <a href="/login">Login?</a></>
  }

  const { email, role, companyName, firstName, lastName, projects } = user;

  return (
    <div className="bg-gray-100 min-h-screen p-4">
        <button onClick={() => logout()}>logout</button>
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Client Dashboard</h1>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Role:</strong> {role}</p>
        <p><strong>Company:</strong> {companyName}</p>
        <p><strong>Name:</strong> {firstName} {lastName}</p>
        <p><strong>Token:</strong> {token.substring(0, 10)}...</p>
        <p><strong>Token Expiry:</strong> {new Date(exp * 1000).toLocaleString()}</p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <ul>
            {projects.map((project, index) => (
              <li key={index} className="bg-gray-200 rounded p-2 mb-2">
                <p><strong>Name:</strong> {project.projectName}</p>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Type:</strong> {project.type}</p>
                <p><strong>Domain:</strong> {project.website?.domain}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>    </div>
  );
};

export default Dashboard;
