import { PlusCircleIcon } from '@heroicons/react/24/solid';

export default function CreateCategoryForm(props) {
  return (
    <form onSubmit={props.formik.handleSubmit} className="mt-8 space-y-6">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Name
          </label>
          {/* Title */}
          <input
            value={props.formik.values.title}
            onChange={props.formik.handleChange('title')}
            onBlur={props.formik.handleBlur('title')}
            type="text"
            autoComplete="text"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
            placeholder="New Category"
          />
          <div className="text-red-400 mb-2">
            {props.formik.touched.title && props.formik.errors.title}
          </div>
        </div>
      </div>

      <div>
        <div>
          {props.loading ? (
            <button
              disabled
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 "
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <PlusCircleIcon
                  className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Loading please wait...
            </button>
          ) : (
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <PlusCircleIcon
                  className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Add new Category
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
