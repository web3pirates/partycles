import styles from '../styles/styles.module.css';
import { wagmiConfig } from '@/providers';
import { useSharedState } from '@/utils/store';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';
import { getEnsName } from 'viem/actions';
import { mainnet } from 'viem/chains';
import { http, useAccount, useEnsAddress, useEnsName } from 'wagmi';

const Wrapper = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: white;
  top: 0;
  padding: 1rem 2rem;
  z-index: 400;
  margin-right: 0px;
  margin-left: 0px;
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
  /* border-bottom: 1px solid #dee2e6; */
  width: 100%;
`;

export function Nav() {
  const { address } = useAccount();
  const ensName = useEnsName({ address, blockTag: 'latest', chainId: 1 });

  return (
    <Wrapper>
      <Menu>
        {/* <Title>
          <Link href="/">Partycles</Link>
        </Title>
        <Title>
          <Link href="/testAtoms">Atoms styles</Link>
        </Title> */}
      </Menu>
      <div style={{ display: 'flex', gap: '10px' }}>
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
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus || authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className={styles.connectButton}
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
                        className={styles.connectButton}
                      >
                        Wrong network
                      </button>
                    );
                  }
                  return (
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button
                        onClick={openChainModal}
                        style={{ display: 'flex', alignItems: 'center' }}
                        type="button"
                        className={styles.connectButton}
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 20,
                              height: 20,
                              borderRadius: 999,
                              overflow: 'hidden',
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
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
                        className={styles.connectButton}
                      >
                        {ensName.data ?? account.displayName}
                        {account.displayBalance ? ` (${account.displayBalance})` : ''}
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
