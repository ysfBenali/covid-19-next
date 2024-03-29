import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 70%;
  min-height:87vh;
  padding: 1rem 0;
  margin: 0 auto;
  @media (max-width: 1200px) {
    width: 80%;
  }
  @media (max-width: 960px) {
    width: 90%;
    flex-direction: column;
  }
`;

export const CasesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin: 1rem auto;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Card = styled.div`
  text-align: center;
  max-width: 24%;
  padding: 1.3rem 0.2rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px -8px #ddd;
  flex-grow: 1;
  font-family: "Gill Sans", sans-serif;

  @media (max-width: 1100px) {
    margin: 0;
    margin-bottom: 2rem;
  }

  @media (max-width: 960px) {
    min-width: 100%;
    padding: 1.4rem 0.5rem;
  }

  @media (max-width: 640px) {
    padding: 0.6rem 0.6rem;
    h4 {
      padding: 0.3rem 0.3rem;
    }
  }

  h1 {
    font-size: 22pt;
    font-weight: 390;
    margin: 0;
    @media (max-width: 1100px) {
      margin: 0;
      font-size: 18pt;
    }
  }

  p {
    margin: 0;
    color: ${({ color }) => color};
    font-size: 24pt;
    @media (max-width: 1100px) {
      font-size: 19pt;
    }
  }

  h4 {
    font-size: 10.2pt;
  }
`;

export const Country = styled.div`
  font-size: 2.5rem;
  padding: 1.5rem 1rem;
  @media (max-width: 1100px) {
    font-size: 2.2rem;
  }
`;

export const Countries = styled.div`
  margin: 2rem auto 2rem;
  width: 30%;
  text-align: left;
  font-size: 15pt;

  label {
    font-size: 13pt;
  }
  @media (max-width: 1100px) {
    min-width: 60%;
  }
  @media (max-width: 960px) {
    min-width: 70%;
    margin-bottom: 1rem;
  }
`;

export const ChartsWraper = styled.div`
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */

  margin-top: 2rem;
  width: 100%;
  & > div {
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    height: 100%;
    flex: 0 0 auto;
  }
  & > .chart-container-2 {
    width: 30%;
    @media (max-width: 1700px) {
      width: 100%;
    }
  }
  & > .chart-container-1 {
    width: 70%;
    @media (max-width: 1700px) {
      width: 100%;
    }
  }

  @media (max-width: 1700px) {
    flex-direction: column-reverse;
  }
`;

export const Tab = styled.div`
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  min-width: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-right: 0.25rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: rgba(108, 117, 125, 0.6);
  background: rgba(108, 117, 125, 0.0627451);
  & :hover {
    color: #6c757d;
    background: #f1f1f1;
  }
  ${(props) =>
    props.clicked &&
    `background: #f1f1f1;
    color: #6c757d;`}
  h4 {
    display: block;
  }
`;
export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  @media (max-width: 1700px) {
    margin-top: 2rem;
  }
`;

export const NewCases = styled.h4`
  &:before {
    content: " ";
    display: inline-block;
  }
  margin: 0;
  padding: 0.6rem 0.6rem;
  text-align: center;
  color: ${({ color }) => color};
  font-size: small;
  font-style: italic;

  @media (max-width: 1100px) {
    padding: 0.3rem 0.3rem;
  }
  @media (max-width: 960px) {
    padding: 0.5rem 0.5rem;
  }
`;

