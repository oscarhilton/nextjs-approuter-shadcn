import { useEffect, useState } from 'react';
import Website from './Website';

export default async function Project({ id }) {
    const response = await fetch(`/api/projects/${id}`);
    const result = await response.json();

  return (
    <li className="bg-gray-200 rounded p-2 mb-2">
      {/* <p><strong>ID:</strong> {project.id}</p> */}
      {/* <p><strong>Project:</strong> {project.projectName}</p> */}
      <p><strong>Status:</strong> {result.status}</p>
      {/* <p><strong>Type:</strong> {project.type}</p> */}
      <Website id={result.website && result.website?.id} />
    </li>
  );
}
