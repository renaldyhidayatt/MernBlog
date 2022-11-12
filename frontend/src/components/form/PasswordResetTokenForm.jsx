import { LockClosedIcon } from '@heroicons/react/24/solid';

function PasswordResetTokenForm(props) {
  return (
    <form className="mt-8 space-y-6" onSubmit={props.formik.handleSubmit}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Enter Your Email Address
          </label>
          <input
            type="email"
            autoComplete="email"
            value={props.formik.values.email}
            onChange={props.formik.handleChange('email')}
            onBlur={props.formik.handleBlur('email')}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
          {/* Err msg */}
          <div className="text-red-400 mb-2">
            {props.formik.touched.email && props.formik.errors.email}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            to="/update-password"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Or Update Your Password ?
          </Link>
        </div>
      </div>

      <div>
        {props.loading ? (
          <button
            disabled
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 "
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
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
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Reset Password
          </button>
        )}
      </div>
    </form>
  );
}

export default PasswordResetTokenForm;
