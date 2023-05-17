import { Card, Form, Row, Space, Typography } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, UserData } from "../../app/serivices/auth";
import { CustomButton } from "../../components/custom-button";
import { CustomInput } from "../../components/custom-input";
import { ErrorMessage } from "../../components/error-message";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/password-input";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import styles from "./index.module.css";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const [loginUser, loginUserResult] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <div className={styles.shapeBox}>
      <div className={styles.shape}></div>
      <Layout>
        <Row align="middle" justify="center">
          <Card className={styles.loginBox} style={{ width: "30rem" }}>
            <h2 className={styles.loginTitle}>Log in</h2>
            <Form onFinish={login}>
              <CustomInput type="email" name="email" placeholder="Email" />
              <PasswordInput name="password" placeholder="password" />
              <CustomButton
                type="primary"
                htmlType="submit"
                loading={loginUserResult.isLoading}
              >
                Log in
              </CustomButton>
            </Form>
            <Space direction="vertical" size="large">
              <Typography.Text>
                Do not have accaunt? <Link to={Paths.register}>Register</Link>
              </Typography.Text>
              <ErrorMessage message={error} />
            </Space>
          </Card>
        </Row>
      </Layout>
    </div>
  );
};
