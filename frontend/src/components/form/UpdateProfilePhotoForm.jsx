import DropZone from 'react-dropzone';

function UpdateProfilePhotoForm(props) {
  return (
    <form className="space-y-6" onSubmit={props.formik.handleSubmit}>
      {props.appErr || props.serverErr ? (
        <h2 className="text-center text-red-500">
          {props.serverErr} {props.appErr}
        </h2>
      ) : null}
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          borderWidth: '2px',
          borderRadius: '2px',
          borderStyle: 'dashed',
          backgroundColor: '#fafafa',
          outline: 'none',
          transition: 'border 0.24s ease-in-out',
        }}
      >
        <DropZone
          onBlur={props.formik.handleBlur('image')}
          accept="image/jpeg, image/png"
          onDrop={(acceptedFiles) => {
            props.formik.setFieldValue('image', acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="container">
              <div
                {...getRootProps({
                  className: 'dropzone',
                  onDrop: (event) => event.stopPropagation(),
                })}
              >
                <input {...getInputProps()} />
                <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                  Click here to select image
                </p>
              </div>
            </div>
          )}
        </DropZone>
      </div>

      <div className="text-red-500">
        {props.formik.touched.image && props.formik.errors.image}
      </div>
      <p className="text-sm text-gray-500">
        PNG, JPG, GIF minimum size 400kb uploaded only 1 image
      </p>
      <div>
        {props.loading ? (
          <button
            disabled
            className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-500 "
          >
            <UploadIcon
              className="-ml-1 mr-2 h-5  text-gray-400"
              aria-hidden="true"
            />
            <span>Loading Please wait...</span>
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <UploadIcon
              className="-ml-1 mr-2 h-5  text-gray-400"
              aria-hidden="true"
            />
            <span>Upload Photo</span>
          </button>
        )}
      </div>
    </form>
  );
}

export default UpdateProfilePhotoForm;
