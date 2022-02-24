import styled from "styled-components";

export const Container = styled.div`
  width: 28%;
  min-width: 15%;
  max-width: 30%;
  color: #005288;
  padding:.8rem;
  background-color: #fff;
  margin-left: 2%;
  margin-right: 2%
  border-radius: 10px;
  margin-bottom: 2.5%;
  display:flex;
  align-items:center;
  cursor: default;
  &:hover {
    position: relative;
    outline: 2px solid #19b0f7;
  }
`;
// height: 117px;
// width: 96px;
// display: flex;
// cursor: pointer;
// flex-direction: column;
// justify-content: space-between;
// align-items: center;
// font-family: Lato, sans-serif;
// font-weight: lighter;
// color: #535b62;
// margin-bottom: 22px;
// padding: 8px 7px 10px 10px;
// border-radius: 8px;
// transition: background 230ms ease-in;
// &:hover {
//   background: #e6f5ff;
// }

export const Logo = styled.div`
  
`;

export const Img = styled.img`
  
`;

export const Name = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left:1rem
`;
