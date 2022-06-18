import styled from 'styled-components';

const Button = (props) => {
    const { children, _onClick, width, height, margin, _disabled } = props;

    const styles = {
        width,
        height,
        margin,

    };
    return (
        <CustomButton
            // {...styles}
            onClick={_onClick}
            style={{ width, height, margin }}
            disabled={_disabled}
        >
            {children}
        </CustomButton>
    );
};
Button.defaultProps = {
    children: null,
    _onChange: () => { },
    _onSubmit: () => { },
    _onClick: () => { },
    _disabled: false,
    margin: false,
    width: false,
};

const CustomButton = styled.button`
  background-color: rgba(150,242,215,1);
  font-family: 'MinSans-Medium';
  color: black;
  padding: 10px;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  ${(props) => (props.width ? `width: ${props.width};` : '100%')};
  ${(props) => (props.height ? `height: ${props.height};` : null)};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)};
  &:hover {
    background-color: rgba(150,242,215,1);
    transform : scale(1.05);
}
`;
export default Button;
