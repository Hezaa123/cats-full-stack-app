import styled from "styled-components";

const rem = (px: number) => `${px / 16}rem`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: black;
    padding: ${rem(24)};
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: ${rem(60)};
`;

const Button = styled.button`
    border-radius: 8px;
    border: ${rem(1)} solid transparent;
    padding: ${rem(10)} ${rem(20)};
    font-size: ${rem(16)};
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;

    :hover {
    border-color: #646cff;
    }

    :focus,
    :focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
    }
`;

const SaveButton = styled(Button)`
    padding: 10px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: ${rem(20)}
`;

const CloseButton = styled(Button)`
    position: absolute;
    top: ${rem(20)};
    right: ${rem(20)};
`;

const Input = styled.input`
    margin-bottom: ${rem(16)};
    padding: ${rem(10)};
    font-size: ${rem(16)};
`;

const TextArea = styled.textarea`
    margin-bottom: ${rem(16)};
    padding: ${rem(10)};
    font-size: ${rem(16)};
`;

export { rem, Overlay, ModalContent, Form, Button, SaveButton, CloseButton, Input, TextArea }