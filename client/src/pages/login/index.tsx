import React from "react";
import { Layout } from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { CustomInput } from "../../components/custom-input";
import { PasswordInput } from "../../components/password-input/input";
import { CustomButton } from "../../components/custom-button";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

export const Login = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Enter" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="password" />
            <CustomButton type="primary" htmlType="submit">
              enter
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Do not have acount?{" "}
              <Link to={Paths.register}>Register please</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
