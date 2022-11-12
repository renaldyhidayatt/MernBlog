import React from 'react';

function UpdateProfileForm(props) {
  return (
    <form className="space-y-6" onSubmit={props.formik.handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <div className="mt-1">
          {/* First name */}
          <input
            value={props.formik.values.firstName}
            onChange={props.formik.handleChange('firstName')}
            onBlur={props.formik.handleBlur('firstName')}
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="firstName"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="text-red-500">
          {props.formik.touched.firstName && props.formik.errors.firstName}
        </div>
      </div>
      <div>
        <label
          htmlFor="text"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <div className="mt-1">
          {/* Last Name */}
          <input
            value={props.formik.values.lastName}
            onChange={props.formik.handleChange('lastName')}
            onBlur={props.formik.handleBlur('lastName')}
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="lastName"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Err msg */}
        <div className="text-red-500">
          {props.formik.touched.lastName && props.formik.errors.lastName}
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="mt-1">
          {/* Email */}
          <input
            value={props.formik.values.email}
            onChange={props.formik.handleChange('email')}
            onBlur={props.formik.handleBlur('email')}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* err msg */}
        <div className="text-red-500">
          {props.formik.touched.email && props.formik.errors.email}
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Bio
        </label>
        <textarea
          value={props.formik.values.bio}
          onChange={props.formik.handleChange('bio')}
          onBlur={props.formik.handleBlur('bio')}
          rows="5"
          cols="10"
          className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
          type="text"
        ></textarea>
        {/* Err msg */}
        <div className="text-red-500">
          {props.formik.touched.bio && props.formik.errors.bio}
        </div>
      </div>
      <div>
        {/* submit btn */}
        {props.loading ? (
          <button
            disabled
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 "
          >
            Loading please wait...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        )}
      </div>
    </form>
  );
}

export default UpdateProfileForm;
