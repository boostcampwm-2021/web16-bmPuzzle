import React, { useCallback, useEffect, useState, createContext } from "react";
import styled from "styled-components";
import ToastCheckIcon from "@images/toast-check-icon.png";
import ToastXIcon from "@images/toast-white-x-icon.png";

const ToastContext = createContext({});

export const ToastContextProvider = (props: any) => {
  const dummy: any[] = [];
  const [toasts, setToasts]: any[] = useState(dummy);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((toasts: any[]) => toasts.slice(1)),
        5000
      );
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = useCallback(
    function (toast) {
      setToasts((prevState: any[]) => [...prevState, toast]);
    },
    [setToasts]
  );

  const handleClose = (idx: number) => {
    setToasts((toasts: any[]) => [
      ...toasts.slice(0, idx),
      ...toasts.slice(idx + 1, toasts.length),
    ]);
  };

  return (
    <ToastContext.Provider value={addToast}>
      {props.children}
      <ToastWrapper>
        {toasts.map((toast: string, idx: number) => (
          <Toast key={idx}>
            <Header>
              <CloseBtn
                onClick={() => {
                  handleClose(idx);
                }}
              >
                <XImg src={ToastXIcon} alt="" />
              </CloseBtn>
            </Header>
            <Content>
              <Img src={ToastCheckIcon} alt="" />
              <Text>{toast}</Text>
            </Content>
          </Toast>
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
};

const ToastWrapper = styled.div`
  position: absolute;
  width: 300px;
  left: 50%;
  top: 65px;
  z-index: 100;
  transform: translate(-50%, 0%);
  text-align: left;
  font-weight: 400;
`;

const Toast = styled.div`
  padding: 1% 0 3% 0;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #00ba00;
`;

const CloseBtn = styled.button`
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  text-align: right;
  &: hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const Header = styled.div`
  width: 97%;
  text-align: right;
  margin-right: 10px;
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
`;

const XImg = styled.img`
  width: 10px;
  height: 10px;
`;

const Text = styled.span`
  margin-left: 10px;
  font-size: 15px;
  font-weight: 400;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

export default ToastContext;
