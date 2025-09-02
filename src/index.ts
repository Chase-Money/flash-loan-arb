// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import { ethers } from "ethers";

// Optional: replace with your actual Uniswap Router or Pair ABIs if needed
// import { UNISWAP_ROUTER_ABI, ERC20_ABI } from "./abis";

// RPC provider (ensure this is in your .env file as RPC_MAINNET)
const provider = new ethers.JsonRpcProvider(process.env.RPC_MAINNET);

// List of token environment variable keys (these should be defined in your .env file)
const tokenSymbols = ["USDC", "DAI", "WETH"]; // Add more as needed

// Loop through each token symbol
for (const symbol of tokenSymbols) {
  const tokenAddress = process.env[symbol];

  if (!tokenAddress) {
    console.warn(`⚠️ Missing address for ${symbol} in .env`);
    continue;
  }

  try {
    // Checksum and validate the address
    const checksummedAddress = ethers.getAddress(tokenAddress);
    console.log(`✅ ${symbol} address is valid: ${checksummedAddress}`);

    // Example usage (uncomment and add actual ABI if needed)
    // const tokenContract = new ethers.Contract(checksummedAddress, ERC20_ABI, provider);
    // const name = await tokenContract.name();
    // console.log(`🔍 ${symbol} token name: ${name}`);

  } catch (err: any) {
    console.error(`❌ Invalid address for ${symbol}:`, err.message);
  }
}
