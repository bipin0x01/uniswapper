import { ethers } from "ethers";

import { shibAddress, usdtAddress, ALCHEMY_API_KEY } from "./constants";
import { UniswapV2PairABI } from "./ABIs";
import { ChainId, Pair, Token, TokenAmount } from "@uniswap/sdk";

const provider = new ethers.AlchemyProvider(ChainId.MAINNET, ALCHEMY_API_KEY);

const createPair = async () => {
  // create a token object for USDT and SHIB
  const fromToken = new Token(ChainId.MAINNET, usdtAddress, 18);
  const toToken = new Token(ChainId.MAINNET, shibAddress, 18);

  // get the pair address for the token pair
  const pairAddress = Pair.getAddress(fromToken, toToken);

  // create a contract object for the pair
  const pairContract = new ethers.Contract(
    pairAddress,
    UniswapV2PairABI,
    provider
  );

  // get the reserves for the pair, getReserves() is a function in the UniswapV2Pair contract and comes from the UniswapV2PairABI
  const reserves = await pairContract.getReserves();
  const [reserve0, reserve1] = reserves;
  const tokens = [fromToken, toToken];
  const [token0, token1] = tokens[0].sortsBefore(tokens[1])
    ? tokens
    : [tokens[1], tokens[0]];

  const pair = new Pair(
    new TokenAmount(token0, reserve0.toString()),
    new TokenAmount(token1, reserve1.toString())
  );
  return pair;
};

createPair()
  .then((pair) =>
    console.log(`Pair LP Address: ${pair.liquidityToken.address}`)
  )
  .catch((error) => console.error("Error creating pair:", error));
