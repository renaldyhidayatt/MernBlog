export default function CreateCommentForm(props) {
  return (
    <>
      <form
        onSubmit={props.formik.handleSubmit}
        className="mt-1 flex max-w-sm m-auto"
      >
        <input
          onBlur={props.formik.handleBlur('description')}
          value={props.formik.values.description}
          onChange={props.formik.handleChange('description')}
          type="text"
          name="text"
          id="text"
          className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md"
          placeholder="Add New comment"
        />
        {props.loading ? (
          <button
            disabled
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-600 "
          >
            Loading please wait...
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        )}
      </form>
      <div className="text-red-400 mb-2 mt-2">
        {props.formik.touched.description && props.formik.errors.description}
      </div>
    </>
  );
}
