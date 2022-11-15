function SendEmailForm(props) {
  return (
    <form className="space-y-6" onSubmit={props.formik.handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Recipient Email
        </label>
        {/* Email message */}
        <div className="mt-1">
          <input
            value={props.formik.values.recipientEmail}
            onChange={props.formik.handleChange('recipientEmail')}
            onBlur={props.formik.handleBlur('recipientEmail')}
            disabled
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="appearance-none block w-full px-3 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Err msg */}
        <div className="text-red-500">
          {props.formik.touched.recipientEmail &&
            props.formik.errors.recipientEmail}
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Subject
        </label>
        <div className="mt-1">
          {/* Subject */}
          <input
            value={props.formik.values.subject}
            onChange={props.formik.handleChange('subject')}
            onBlur={props.formik.handleBlur('subject')}
            id="subject"
            name="subject"
            type="text"
            autoComplete="subject"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* err msg */}
        <div className="text-red-500">
          {props.formik.touched.subject && props.formik.errors.subject}
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          value={props.formik.values.message}
          onChange={props.formik.handleChange('message')}
          onBlur={props.formik.handleBlur('message')}
          rows="5"
          cols="10"
          className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
          type="text"
        ></textarea>
        <div className="text-red-500">
          {props.formik.touched.message && props.formik.errors.message}
        </div>
      </div>
      {/* Submit btn */}
      <div>
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
            Send
          </button>
        )}
      </div>
    </form>
  );
}

export default SendEmailForm;
