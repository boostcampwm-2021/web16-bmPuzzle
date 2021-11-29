import React, { useCallback, useEffect, useState, createContext } from "react";
import styled from "styled-components";
import ToastCheckIcon from "@images/toast-check-icon.png";
import ToastNoIcon from "@images/toast-exclamation-icon.png";
import ToastXIcon from "@images/toast-x-icon.png";

const ToastContext = createContext({});

export const ToastContextProvider = (props: any) => {
  const dummy: any[] = [];
  const [toasts, setToasts]: any[] = useState(dummy);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((toasts: any[]) => toasts.slice(1)),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = useCallback(
    function (toast, status) {
      status !== undefined ? setStatus(false) : setStatus(true);
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
          <Toast key={idx} status={status}>
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
              <Img src={status ? ToastCheckIcon : ToastNoIcon} alt="" />
              <Text>{toast}</Text>
            </Content>
          </Toast>
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
};

interface statusProp {
  key: number;
  status: boolean;
}

const ToastWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 65px;
  z-index: 100;
  transform: translate(-50%, 0%);
  text-align: left;
  font-weight: 400;
`;

const Toast = styled.div<statusProp>`
  padding: 1% 0 3% 0;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => (props.status ? "green" : "red")};
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
  width: calc(100% - 20px);
  text-align: right;
  margin: 0 10px;
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
  padding: 0 30px 0 10px;
  font-size: 15px;
  font-weight: 400;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

export default ToastContext;
