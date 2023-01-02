import React, { useEffect } from 'react';
import { GoogleLoginImg } from 'assets/img';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import styled from 'styled-components';
import theme from 'styles/theme';

import Layout from 'components/common/Layout';

function Login() {
  const { data: a } = useSession();
  //const { accessToken } = data;

  useEffect(() => {
    if (a) {
      console.log(a);
      //console.log(async () => await getToken({}));
    }
  }, [a]);

  return (
    <Layout>
      <Styled.Root>
        <Styled.GreetingImg />
        <Styled.LoginButton onClick={() => signIn('google')}>
          <Image src={GoogleLoginImg} alt="구글로그인 버튼 이미지" />
        </Styled.LoginButton>
        <Styled.Message>
          로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,
          <br />
          서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.
        </Styled.Message>
      </Styled.Root>
    </Layout>
  );
}

export default Login;

const Styled = {
  Root: styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  `,
  GreetingImg: styled.img`
    width: 70rem;
    height: 50rem;
    background-color: #d9d9d9;
    border-radius: 1.5rem;
  `,
  LoginButton: styled.button`
    width: 69.2rem;
    height: 7rem;
    margin-top: 8rem;
    border: 0;
    background: transparent;
    cursor: pointer;
  `,
  Message: styled.h1`
    margin-top: 6.2rem;
    text-align: center;
    color: #667080;
    ${theme.fonts.caption1}
  `,
};
