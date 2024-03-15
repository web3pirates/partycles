import { connectButtonStyle } from "@/style";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import styled from "styled-components";
import { useAccount } from "wagmi";

const Wrapper = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  position: fixed;
  margin-right: auto;
  margin-left: auto;
`;

const Title = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #dee2e6;
`;

export function Nav() {
  const { address } = useAccount();
  return (
    <Wrapper>
      <Menu>
        <Title>
          <Link href="/" className="text-red-300">
            Your cool App
          </Link>
        </Title>
        <Title>
          <Link href="/testAtoms">Atoms styles</Link>
        </Title>
      </Menu>
      <div style={{ display: "flex", gap: "10px" }}>
        {address && (
          <button className={`${connectButtonStyle} flex gap-2 items-center`}>
            <img
              src="/images/github.png"
              alt={`Github image`}
              width={15}
              height={15}
            />
            {address}
          </button>
        )}
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className={`${connectButtonStyle} `}
                      >
                        Connect Wallet
                      </button>
                    );
                  }
                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        type="button"
                        className={`${connectButtonStyle} `}
                      >
                        Wrong network
                      </button>
                    );
                  }
                  return (
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={openChainModal}
                        type="button"
                        className={`${connectButtonStyle} flex items-center`}
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 20,
                              height: 20,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                style={{ width: 20, height: 20 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>
                      <button
                        onClick={openAccountModal}
                        type="button"
                        className={`${connectButtonStyle} `}
                      >
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </Wrapper>
  );
}
