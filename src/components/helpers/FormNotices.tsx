import { Alert, Spin } from "antd";

export const FormNotices = ({
  error,
  loading,
  success,
}: {
  error: string;
  loading: boolean;
  success: boolean;
}) => {
  if (!(error || loading || success)) return null;
  return (
    <div style={{ marginBottom: "1em", textAlign: "center" }}>
      {error ? <Alert message={error} type="error" /> : null}
      {loading ? <Spin /> : null}
      {success ? <Alert message="Success!" type="success" /> : null}
    </div>
  );
};
