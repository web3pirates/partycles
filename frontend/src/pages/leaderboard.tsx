import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Table } from "@/components/Table";
import { CustomContainer, Layout } from "@/components/atoms";

export default function Leaderboard() {
  return (
    <>
      <Layout>
        <Nav />
        <CustomContainer as="main">
          <Table />
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}
