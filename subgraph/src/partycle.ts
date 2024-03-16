import {
  Transfer as ERC20Transfer,
  Transfer1 as ERC721Transfer,
  Partycle,
} from "../generated/Partycle/Partycle";
import { NFT, User } from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";

const BIGINT_ZERO = BigInt.fromI32(0);

export function handleERC20Transfer(event: ERC20Transfer): void {
  // we want only to track mints, for balance we can use contract calls
  if (event.params.from == Address.zero()) {
    let user = User.load(event.params.to);
    if (!user) {
      user = new User(event.params.to);
      user.gained = BIGINT_ZERO;
      user.save();
    }

    user.gained = user.gained.plus(event.params.amount);
    user.save();
  }
}

export function handleERC721Transfer(event: ERC721Transfer): void {
  let fromUser = User.load(event.params.from);
  if (!fromUser) {
    fromUser = new User(event.params.from);
    fromUser.gained = BIGINT_ZERO;
    fromUser.save();
  }

  let toUser = User.load(event.params.to);
  if (!toUser) {
    toUser = new User(event.params.to);
    toUser.gained = BIGINT_ZERO;
    toUser.save();
  }

  const id = event.params.id.toString();
  let erc721 = NFT.load(id);
  if (!erc721) {
    erc721 = new NFT(id);
    const contract = Partycle.bind(event.address);
    erc721.tokenURI = contract.tokenURI(event.params.id);
    erc721.owner = event.params.from;
    erc721.save();
  }

  erc721.owner = event.params.to;
  erc721.save();
}
