import React from "react";
import Image from "next/image"

async function getData() {
  try {
    const req = await fetch('http://www.localhost:3000/health')
    return await req.text()
  } catch (err) {
    return err
  }
}

async function ProjectCard({ project  }: any) {
  const { id, type, projectName, createdAt, updatedAt, status, website, dueDate, startDate } = project;

  const live = await getData()

  console.log({ live })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-4 max-w-md">
        {/* <Image className="p-5 border solid rounded-lg m-auto mb-5" src={"data:image/png;base64,"+ base64} width={358} height={223} alt="screenshot" /> */}
      <div className="block">
      <h2 className="text-md font-semibold mb-2 text-gray-900 dark:text-gray-100">{projectName}: {`${live}`}</h2>
      {website && (
        <>
          {/* <WebsiteScreenshot domain={website.domin} /> */}
          <p className="text-gray-900 dark:text-gray-100"><strong>Title:</strong> {website.title}</p>
          {/* <p className="text-gray-900 dark:text-gray-100"><strong>Domain:</strong> <a href={website.domain} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400">{website.domain}</a></p> */}
        </>
      )}
      {/* <p className="text-gray-900 dark:text-gray-100"><strong>Type:</strong> {type}</p> */}
      <p className="text-gray-900 dark:text-gray-100"><strong>Status:</strong> {status}</p>
      <p className="text-gray-900 dark:text-gray-100"><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
      {/* <p className="text-gray-900 dark:text-gray-100"><strong>Updated At:</strong> {new Date(updatedAt).toLocaleDateString()}</p> */}
      {/* <p className="text-gray-900 dark:text-gray-100"><strong>Due Date:</strong> {dueDate ? new Date(dueDate).toLocaleDateString() : "not set"}</p> */}
      {/* <p className="text-gray-900 dark:text-gray-100"><strong>Start Date:</strong> {startDate ? new Date(startDate).toLocaleDateString() : "not set"}</p> */}
    </div>
    </div>
  );
};

export default ProjectCard;