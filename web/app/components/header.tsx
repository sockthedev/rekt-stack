import { Link } from "@remix-run/react";

export const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="ml-6 flex space-x-8">
              <Link
                to="/"
                className="inline-flex items-center border-b-2 border-slate-500 px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Products
              </Link>
            </div>
          </div>
          <div className="ml-6 flex items-center"></div>
        </div>
      </div>
    </nav>
  );
};
