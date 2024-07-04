import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative">
        <div className="  mb-4 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl">
          404
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">PAGE NOT FOUND</h1>
      <p className="text-gray-600 mb-8 text-center">
        We looked everywhere for this page. <br />
        Are you sure the website URL is correct? <br />
        Get in touch with the site owner.
      </p>
      <Link to="/landingpage" className="btn btn-info btn-outline">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
