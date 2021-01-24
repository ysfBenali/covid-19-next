import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 70%;
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
  padding: 2rem 1rem;
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
    padding: 2rem 0.5rem;
  }

  @media (max-width: 640px) {
    padding: 0.6rem 0.5rem;
  }

  h1 {
    font-size: 19pt;
    font-weight: 390;
    margin-bottom: 1rem;
    @media (max-width: 1100px) {
      margin: 0;
      font-size: 18pt;
    }
  }

  p {
    font-size: 24pt;
    margin: 0;
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
  margin: 1rem auto 2rem;
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
