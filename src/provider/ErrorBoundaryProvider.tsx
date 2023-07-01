import { FC, PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

const FallbackComponent = () => <div>Error...</div>;

const ErrorBoundaryProvider: FC<PropsWithChildren<object>> = ({
  children,
}: PropsWithChildren<object>) => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryProvider;
