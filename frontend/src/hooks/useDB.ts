import { http } from "@/utils/fetch";

export function useDB() {
  async function exampleGetCall(): Promise<any[]> {
    let res;
    try {
      res = await http({
        method: "GET",
        json: true,
        form: "",
        url: "/example",
      });
    } catch (e) {
      console.error(e);
    }

    return res;
  }

  return {
    exampleGetCall,
  };
}
