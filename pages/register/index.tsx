import React, { useEffect, useState } from 'react';
import { LoginMouseImg } from 'assets/img';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isRegisterState } from 'states/user';
import styled from 'styled-components';
import theme from 'styles/theme';

import NextButton from '@/components/register/NextButton';
import useRedirect from '@/hooks/common/useRedirect';
import Layout from 'components/common/Layout';
import SizeForm from 'components/common/SizeForm/SizeForm';
import Progress from 'components/register/Progress';
import SizeOption from 'components/register/SizeOption';

// 버튼 컴포넌트 전달을 위한 타입
export type OptionType = '상의' | '하의' | '상/하의' | null;

function Register() {
  const [progress, setProgress] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<OptionType>(null);
  const [isNextActive, setIsNextActive] = useState<boolean>(false);
  const [isAlertActive, setIsAlertActive] = useState<boolean>(false);
  const [skip, setSkip] = useState<boolean>(false);
  const [, setIsRegister] = useRecoilState(isRegisterState);
  const router = useRouter();

  const onClickSize = () => {
    if (progress === 3) {
      // 서버에 데이터 넘기고 home으로 이동
    } else if (isNextActive) {
      setProgress((prev) => prev + 1);
      setIsNextActive(false);
    }
  };

  const onClickNextButton = () => {
    if (skip) {
      localStorage.setItem('isRegister', 'true');
      setIsRegister(true);
      router.push('/home');
    } else {
      setIsAlertActive(true);
    }
  };

  const onSuccessSubmit = () => {
    if (progress === 2) {
      setProgress(progress + 1);
      setIsNextActive(false);
    } else {
      localStorage.setItem('isRegister', 'true');
      setIsRegister(true);
      router.push('/home');
    }
  };

  const { isLoading } = useRedirect();

  return (
    <Layout noHeader noMenuBar noFooter>
      {isLoading ? (
        <></>
      ) : (
        <Styled.Root>
          <Styled.LeftConatiner>
            <h1>Log In</h1>
            <h2>
              기존에 구매한 옷 중 가장 잘 맞는 제품의 사이즈를 찾아 입력해주세요.
              <br />
              입력하신 사이즈 기준으로 가장 유사한 사이즈의 제품을 추천해드려요.
            </h2>
            <Image src={LoginMouseImg} alt="로그인 배경 이미지" placeholder="blur" height={1000} width={172} />
          </Styled.LeftConatiner>
          <Styled.RightContainer>
            <Progress progress={progress} selectedOption={selectedOption} />
            {progress === 1 ? (
              <SizeOption
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                isNextActive={isNextActive}
                setIsNextActive={setIsNextActive}
                onClickNext={onClickSize}
              />
            ) : progress === 2 ? (
              <SizeForm
                isAlertActive={isAlertActive}
                setIsAlertActive={setIsAlertActive}
                formType={selectedOption === '하의' ? '하의' : '상의'}
                setIsSubmitActive={setIsNextActive}
                onSuccessSubmit={onSuccessSubmit}
              >
                <NextButton isActive={isNextActive} onClick={onClickNextButton} />
              </SizeForm>
            ) : (
              <SizeForm
                progress={progress}
                isAlertActive={isAlertActive}
                setIsAlertActive={setIsAlertActive}
                formType={selectedOption === '하의' ? '상의' : '하의'}
                setIsSubmitActive={setIsNextActive}
                onSuccessSubmit={onSuccessSubmit}
                isOption={selectedOption === '상/하의' ? false : true}
                skip={skip}
                setSkip={setSkip}
              >
                <NextButton isActive={isNextActive} onClick={onClickNextButton} />
              </SizeForm>
            )}
          </Styled.RightContainer>
        </Styled.Root>
      )}
    </Layout>
  );
}

export default Register;

const Styled = {
  Root: styled.section`
    margin: 0 auto;
    display: flex;
    width: 100vw;
    height: 100vh;
  `,
  LeftConatiner: styled.article`
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 61.2rem;
    height: 100%;
    background-color: #1e2025;
    > h1 {
      margin-top: 16.2rem;
      color: ${theme.colors.yellow};
      ${theme.fonts.title1}
    }
    > h2 {
      margin-top: 4.2rem;
      color: ${theme.colors.gray000};
      ${theme.fonts.body4};
    }
    img {
      position: fixed;
      left: 41.5rem;
      top: 4.6rem;
    }
  `,
  RightContainer: styled.article`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 8.6rem;
    width: 100%;
    background-color: #f5f5f5;
  `,
};
