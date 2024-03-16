import { Nav } from "@/components/Nav";
import {
  Button,
  Container,
  Description,
  Form,
  Input,
  Label,
  Layout,
  TextArea,
  Title,
} from "@/components/atoms";
import { http } from "@/utils/fetch";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAsyncMemo } from "use-async-memo";
import { useAccount } from "wagmi";

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

// Page component
const ExampleCreationPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();

  useEffect(
    () => setFormData((data) => ({ ...data, creator: address })),
    [address]
  );

  const allowance = useAsyncMemo(async () => {
    if (!address) return 0;
    // const allowance = await readContract({
    //   address: TOKEN_ADDRESS,
    //   chainId: sepolia.id,
    //   abi: erc20ABI,
    //   args: [address, MY_ADDRESS],
    //   functionName: "allowance",
    // });

    return 1;
  }, [address, isLoading]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const amount = useMemo(() => BigInt(20) * BigInt(10 ** 2), [formData]);

  const shouldApprove = useMemo(
    () => (allowance || 0) < amount,
    [allowance, amount]
  );

  // const handleApprove = useCallback(async () => {
  //   setIsLoading(true);
  //   const { hash } = await writeContract({
  //     abi: erc20ABI,
  //     address: CONTRACT_ADDRESS,
  //     chainId: sepolia.id,
  //     functionName: "approve",
  //     args: [MY_ADDRESS, amount],
  //   });

  //   // add loader for transaction

  //   const transaction = await waitForTransaction({
  //     chainId: sepolia.id,
  //     hash,
  //   });

  //   //add success message
  //   setIsLoading(false);
  // }, [amount]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      ...formData,
    };

    try {
      await http({
        method: "POST",
        form: data,
        json: true,
        url: "/example",
      });
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <Layout>
      <Nav />

      <Container
        as="main"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Title>Create a new App</Title>
        <Description>Wow what a nice app</Description>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">App Title:</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter app title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description:</Label>
            <TextArea
              id="description"
              name="description"
              placeholder="Enter app description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
            />
          </FormGroup>

          <Button type="submit" disabled={shouldApprove || isLoading}>
            Submit
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default ExampleCreationPage;
