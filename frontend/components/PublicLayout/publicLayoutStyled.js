import styled from "styled-components";

export const CenteredContainer = ({className, children}) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
}
  
export const StyledCenteredContainer = styled(CenteredContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const HeaderWrapper = styled.div`
    margin-bottom: 10px;
`;