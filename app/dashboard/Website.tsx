import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
 
export const getServerSideProps = (async ({context}) => {
  const res = fetch('/api/v1/websites');
  return { props: { res } }
}) satisfies GetServerSideProps

function WebsiteCard({ website }) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
        <div className="font-bold text-xl mb-2">{website.title}</div>
        <p className="text-gray-700 text-base">
          <strong>Domain:</strong> <a href={website.domain} className="text-blue-500">{website.domain}</a>
        </p>
        <p className="text-gray-700 text-base">
          <strong>Created At:</strong> {new Date(website.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Updated At:</strong> {new Date(website.updatedAt).toLocaleString()}
        </p>
      </div>
    );
  }

export default function Website({ res }) {
  return (
    <li className="bg-gray-200 rounded p-2 mb-2">
      <WebsiteCard website={res}  />
    </li>
  );
}
