import { mq } from "@/styles/breakpoints";
import styled, { keyframes } from "styled-components";

export const Layout = styled.div`
  // Vertically centered layout
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f4f7fa;
  color: #1d3b3b;
  gap: 3rem;

  width: 100%;
  padding: 2rem;
  min-height: 100svh;

  @media ${mq.sm.max} {
    padding: 1rem;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const LabelCard = styled.div`
  margin-bottom: 5px;
  width: fit-content;
  color: white;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: bold;
  padding: 0.5rem;
  text-transform: capitalize;
  background-color: #90b4ff;
`;

export const TinyLabelCard = styled.div`
  margin-bottom: 2px;
  font-size: 0.8rem;
  width: fit-content;
  color: white;
  border: 1px solid black;
  border-radius: 3px;
  font-weight: bold;
  padding: 0.3rem;
  text-transform: capitalize;
  background-color: #90b4ff;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 80rem;
  margin-left: auto;
  margin-top: 2rem;
  margin-right: auto;
`;

export const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: left;
  text-align: left;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  text-align: center;
  /* padding-top: 1rem; */
`;

export const CreateButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #1d3b3b;
  margin-bottom: 0rem;
  margin-top: 2.5rem;
`;

export const Description = styled.p`
  text-align: left;
  color: black;
`;

export const BannerImage = styled.img`
  border-radius: 0.5rem;
  width: 100%;
  height: 16rem;
  object-fit: cover;
`;

export const StyledDetail = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: #333;
  background-color: white;
  border-left: 4px solid #007bff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  span {
    font-weight: bold;
    color: #007bff;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  th,
  td {
    text-align: left;
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f9fa;
    color: #333;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled component for the Loader
export const Loader = styled.div`
  border: 4px solid #f3f4f6; /* Light grey border */
  border-top: 4px solid #3498db; /* Blue color for the spinner */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
  display: inline-block;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const GPTDescription = styled.div`
  background-color: #f3f4f6; /* Light grey background */
  border: 1px solid #e5e7eb; /* Slightly darker border for depth */
  border-radius: 8px; /* Rounded corners */
  padding: 1rem; /* Spacing inside the box */
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.1); /* Subtle shadow for 3D effect */
  color: #1f2937; /* Dark grey text for readability */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; /* A clean, readable font */
  text-align: left; /* Align text to the left */
  font-size: 1rem; /* Standard font size */
  line-height: 1.5; /* Spacing between lines */
`;

export const HackathonBox = styled.div`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 0.75rem;
  padding: 1rem;
  width: 300px;
  text-align: left;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.25rem;
  }

  h3 {
    margin-top: 0.5rem;
    font-size: 1.2rem;
  }

  p {
    margin: 0.5rem 0;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const HackathonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

export const StyledImage = styled.img`
  border-radius: 0.5rem;
  width: 100%;
  height: 16rem;
  object-fit: cover;
`;
