import dotenv from "dotenv";
dotenv.config();

// router address for uniswap
const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
// USDT
const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
// USDT Token
const oneInchAddress = "0x111111111117dC0aa78b770fA6A738034120C302";

// Shib
const shibAddress = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";

export const { ALCHEMY_API_KEY } = process.env;

export { routerAddress, usdtAddress, oneInchAddress, shibAddress };
