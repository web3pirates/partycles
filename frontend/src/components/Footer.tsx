import { GithubIcon } from "@/assets/icons";
import { mq } from "@/styles/breakpoints";
import Image from "next/image";
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

export const Socials = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.2rem;
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
      <Links>
        <Socials>
          <Image
            src="https://ca.slack-edge.com/T02742R3GCA-U03K7DS332B-6baeeda84c7a-512"
            alt="Partycles"
            width={32}
            height={32}
          />
          <Link href="https://twitter.com/albygiaco98" target="_blank">
            shrekislife.eth
          </Link>
        </Socials>
        <Socials>
          <Image
            src="https://ca.slack-edge.com/T02742R3GCA-U02L1AG06AX-5559e1b0da72-512"
            alt=""
            width={32}
            height={32}
          />{" "}
          <Link href="https://twitter.com/0xreekee" target="_blank">
            reekee.eth
          </Link>
        </Socials>
        <Socials>
          <Image
            src="https://ca.slack-edge.com/T02742R3GCA-U027GNCE317-9edefd667b4b-512"
            alt=""
            width={32}
            height={32}
          />
          <Link href="https://twitter.com/luduvigo" target="_blank">
            luduvigo.eth
          </Link>
        </Socials>
      </Links>

      <Links>
        {!!ensName && !!ensName.data && (
          <Links>
            <Link
              href={`https://zapper.xyz/account/${ensName.data}`}
              target="_blank"
            >
              Zapper account @{ensName.data}
            </Link>
          </Links>
        )}
        <Link href="https://github.com/web3pirates/partycles" target="_blank">
          <GithubIcon />
        </Link>
      </Links>
    </Wrapper>
  );
}
