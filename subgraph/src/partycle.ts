import {
  Transfer as ERC20Transfer,
  Transfer1 as ERC721Transfer,
  Partycle,
} from "../generated/Partycle/Partycle";
import { NFT, User } from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function handleERC20Transfer(event: ERC20Transfer): void {
  // we want only to track mints, for balance we can use contract calls
  if (event.params.from == Address.zero()) {
    let user = User.load(event.params.to);
    if (!user) {
      user = new User(event.params.to);
      user.gained = BigInt.fromI32(0);
      user.save();
    }

    user.gained = user.gained.plus(event.params.amount);
    user.save();
  }
}

export function handleERC721Transfer(event: ERC721Transfer): void {
  const id = event.params.id.toString();
  let erc721 = NFT.load(id);
  if (!erc721) {
    erc721 = new NFT(id);
    const contract = Partycle.bind(event.address);
    erc721.tokenURI = contract.tokenURI(event.params.id);
    erc721.owner = Address.fromI32(0);
    erc721.save();
  }
  erc721.owner = event.params.to;
  erc721.save();
}
