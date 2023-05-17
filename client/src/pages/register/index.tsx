import { User } from "@prisma/client";
import { Card, Form, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../app/serivices/auth";
import { CustomButton } from "../../components/custom-button";
import { CustomInput } from "../../components/custom-input";
import { ErrorMessage } from "../../components/error-message";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/password-input";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import styles from "./index.module.css";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();

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
          <Card style={{ width: "30rem" }} className={styles.registerBox}>
            <h1 className={styles.registerTitle}>Register</h1>
            <Form onFinish={register}>
              <CustomInput type="text" name="name" placeholder="Name" />
              <CustomInput type="email" name="email" placeholder="Email" />
              <PasswordInput name="password" placeholder="Password" />
              <PasswordInput name="confirmPassword" placeholder="Password" />
              <CustomButton type="primary" htmlType="submit">
                Register
              </CustomButton>
            </Form>
            <Space direction="vertical" size="large">
              <Typography.Text>
                Already registered? <Link to={Paths.login}>Log in</Link>
              </Typography.Text>
              <ErrorMessage message={error} />
            </Space>
          </Card>
        </Row>
      </Layout>
    </div>
  );
};
