import { GithubIcon } from "@/assets/icons";
import { mq } from "@/styles/breakpoints";
import styled from "styled-components";
import { useAccount, useEnsName } from "wagmi";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media ${mq.sm.max} {
    gap: 0.75rem;
    flex-direction: column-reverse;
  }
`;

export const Links = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

const Link = styled.a`
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
  transition: color 0.15s ease-in-out;

  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }
`;

export function Footer() {
  const { address } = useAccount();
  const ensName = useEnsName({ address, blockTag: "latest", chainId: 1 });
  return (
    <Wrapper>
      {ensName && (
        <Links>
          <Link
            href={`https://zapper.xyz/account/${ensName.data}`}
            target="_blank"
          >
            Zapper account @{ensName.data}
          </Link>
        </Links>
      )}

      <Links>
        <Link
          href="https://github.com/web3pirates/partycles"
          target="_blank"
          className="flex"
        >
          Partycles ®<GithubIcon />
        </Link>
      </Links>
    </Wrapper>
  );
}
