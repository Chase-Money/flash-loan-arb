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
// file: src/index.ts
import { config } from "dotenv";
import { ethers } from "ethers";

config();

const rpc = process.env.RPC_MAINNET!;
const USDC = process.env.USDC!;
const DAI = process.env.DAI!;
const WETH = process.env.WETH!;

const erc20Abi = [
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
];

function isHexAddress(a?: string) {
  return typeof a === "string" && /^0x[0-9a-fA-F]{40}$/.test(a);
}

async function safeTokenInfo(
  provider: ethers.Provider,
  addr: string,
  label: string
) {
  if (!isHexAddress(addr)) {
    console.log(`❌ ${label} missing/invalid in .env: ${addr}`);
    return;
  }
  const token = new ethers.Contract(addr, erc20Abi, provider);
  try {
    const [sym, dec] = await Promise.all([token.symbol(), token.decimals()]);
    console.log(`✅ ${label}: ${addr} | ${sym} (decimals=${dec})`);
  } catch (e: any) {
    console.log(`⚠️  ${label}: ${addr} — could not read symbol/decimals (${e?.message ?? e})`);
  }
}

async function main() {
  console.log("🔌 RPC:", rpc);

  const provider = new ethers.JsonRpcProvider(rpc);

  // one-time sanity checks
  await Promise.all([
    safeTokenInfo(provider, USDC, "USDC"),
    safeTokenInfo(provider, DAI, "DAI"),
    safeTokenInfo(provider, WETH, "WETH"),
  ]);

  // keepalive loop: print block number + basic latency every 10s
  const LOOP_MS = 10_000;

  async function tick() {
    const t0 = Date.now();
    try {
      const block = await provider.getBlockNumber();
      const dt = Date.now() - t0;
      console.log(
        `⏱  block=${block} | rpc_latency=${dt}ms | ${new Date().toISOString()}`
      );
    } catch (e: any) {
      console.error("❌ tick error:", e?.message ?? e);
    }
  }

  await tick(); // immediate
  setInterval(tick, LOOP_MS);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});