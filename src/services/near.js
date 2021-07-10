import { keyStores, Near, WalletConnection, utils } from "near-api-js";
import BN from "bn.js";

export const CONTRACT_ID = "museum.testnet";
const gas = new BN("30_000_000_000_000");

// use new NEAR here to avoid needing async/await
export const near = new Near({
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
});

// can now create a new WalletConnection with the created Near object
export const wallet = new WalletConnection(near, "museum");

// a service to get memes from the blockchain
export const getMemeList = () => {
  return wallet.account().viewFunction(CONTRACT_ID, "get_meme_list", {});
};
// a service to add a meme from the blockchain but this is not working for now
export const addMeme = ({ meme, title, data, category }) => {
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: "add_meme",
    gas,
    args: { meme, title, data, category },
    attachedDeposit: utils.format.parseNearAmount("3"),
  });
};
// a service to get a single meme's info
export const getMeme = (meme) => {
  const memeContractId = meme + "." + CONTRACT_ID;
  return wallet.account().viewFunction(memeContractId, "get_meme", {});
};

// a service to get a single meme's comments
export const getMemeComments = (meme) => {
  const memeContractId = meme + "." + CONTRACT_ID;
  return wallet
    .account()
    .viewFunction(memeContractId, "get_recent_comments", {});
};
// a service to add a comment to a meme
export const addComment = ({ meme, text }) => {
  const memeContractId = meme + "." + CONTRACT_ID;
  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: "add_comment",
    args: { text },
  });
  // console.log("this is services layer");
  // console.log(meme);
  // console.log(text);
};