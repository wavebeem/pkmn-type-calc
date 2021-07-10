import { Fragment, FunctionComponent, h, VNode } from "preact";
import { useErrorBoundary } from "preact/hooks";

interface ErrorBoundaryProps {
  render: (error: Error) => VNode;
}

const ErrorBoundary: FunctionComponent<ErrorBoundaryProps> = ({
  render,
  children,
}) => {
  const [error, _resetError] = useErrorBoundary();
  if (error) {
    return <Fragment>{render(error)}</Fragment>;
  }
  return <Fragment>{children}</Fragment>;
};

export default ErrorBoundary;
