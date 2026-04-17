const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
}) => (
  <div className="min-h-75 flex items-center justify-center">
    <div className="text-center px-4">
      <div className="text-5xl mb-4">⚠️</div>
      <p className="text-red-500 font-semibold text-sm sm:text-base">
        {message}
      </p>
    </div>
  </div>
);

export default ErrorMessage;
