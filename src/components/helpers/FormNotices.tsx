import { Alert, Spin } from "antd";
import { useEffect, useState } from "react";

export const FormNotices = ({
  error,
  loading,
  success,
}: {
  error: string;
  loading: boolean;
  success: boolean;
}) => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let timeout: any;

    if (success) {
      timeout = setTimeout(() => {
        setHidden(true);
      }, 300);
    } else {
      setHidden(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  if (!(error || loading || success)) return null;
  return (
    <div style={{ marginBottom: "1em", textAlign: "center" }}>
      {error ? <Alert message={error} type="error" /> : null}
      {loading ? <Spin /> : null}
      {success && !hidden ? <Alert message="Success!" type="success" /> : null}
    </div>
  );
};
