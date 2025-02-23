import {ASSET_DECIMALS, ASSET_ID} from "./steady_config";
import {Address} from "@ton/core";
import {TonClient} from "@ton/ton";
import {configDotenv} from "dotenv";
import {MAINNET_POOL_CONFIG} from "@evaafi/sdk";

export const HIGHLOAD_ADDRESS = Address.parse('UQDo27P-CAam_G2xmQd4CxnFYjY2FKPmmKEc8wTCh4c33JWn')
// jetton wallets of specified highloadAddress
export const JETTON_WALLETS = new Map<bigint, Address>([
    // Main-jwallets
    // [ASSET_ID.jUSDT, Address.parse('EQA6X8-lL4GOV8unCtzgx0HiQJovggHEniGIPGjB7RBIRR3M')],
    // [ASSET_ID.jUSDC, Address.parse('EQA6mXtvihA1GG57dFCbzI1NsBlMu4iN-iSxbzN_seSlbaVM')],
    // [ASSET_ID.stTON, Address.parse('EQAw_YE5y9U3LFTPtm7peBWKz1PUg77DYlrJ3_NDyQAfab5s')],
    // [ASSET_ID.tsTON, Address.parse('EQDdpsEJ2nyPP2W2yzdcM2A4FeU-IQGyxM0omo0U2Yv2DvTB')],
    [ASSET_ID.USDT, Address.parse('EQC183ELZmTbdsfRtPmp-SzyRXf0UOV3pdNNwtX2P98z2pQM')],
    // LP-jwallets
    // [ASSET_ID.TONUSDT_DEDUST, Address.parse('EQD1msA18OaAzYPAVrFKfbxHCl1kxQkzsY7zolgtwAqgUuMP')],
    // [ASSET_ID.TONUSDT_STONFI, Address.parse('EQAoXoKRiIx8SDXBXKUHJXfGYXi98a7Pr0UzMOSLz4gely2Z')],
    // [ASSET_ID.TON_STORM, Address.parse('EQChlnD11dNt5QpiykF_WMniq8WfsQ8I4n2aFhfknU5eOfbP')],
    // [ASSET_ID.USDT_STORM, Address.parse('EQAQnMn2bCY1BcTVqawdblFMh3yw5kkJqiHi52ey-gbL6ofM')],
    // Alt-jwallets
    // [ASSET_ID.NOT, Address.parse('EQA_0UoglJR8JtKq9CGZdBBY9TY3vyW8Z7obKY95Q9_1Cih9')],
    // [ASSET_ID.DOGS, Address.parse('EQAbOe8N-RjCL6Y9vI6nlY9WPNeQwiJN7fzf80mGdogiPChn')],
    // [ASSET_ID.CATI, Address.parse('EQDg_8tzSeJ64lejC3TPfNdlhR1HbLC7uABTRzdJMq55HEFy')],
]);

export const IS_TESTNET = false;

const DB_PATH_MAINNET = './database-mainnet.db';
const DB_PATH_TESTNET = './database-testnet.db';

export const DB_PATH = IS_TESTNET ? DB_PATH_TESTNET : DB_PATH_MAINNET

/* Actual configuration */
export const RPC_ENDPOINT = 'https://toncenter.com/api/v2/jsonRPC'
export const TON_API_ENDPOINT = 'https://tonapi.io/';

export async function makeTonClient() {
    configDotenv();
    const tonClient = new TonClient({
        endpoint: RPC_ENDPOINT,
        apiKey: process.env.TONCENTER_API_KEY
    });
    return tonClient;
}

export const USER_UPDATE_DELAY = 60_000; // 60 seconds
export const TX_PROCESS_DELAY = 40; // ms
export const RPC_CALL_DELAY = 20; // ms

// export const POOL_CONFIG = MAINNET_LP_POOL_CONFIG; // for main pool v5
export const POOL_CONFIG = MAINNET_POOL_CONFIG;

// min levels for liquidation task
export const MIN_AMOUNT_USDT_TO_LIQUIDATE = BigInt(300 * Number(ASSET_DECIMALS['USDT'])) // 300$
export const MIN_AMOUNT_TON_TO_LIQUIDATE = BigInt(53 * Number(ASSET_DECIMALS['TON'])) // 53 TON
export const MIN_AMOUNT_jUSDT_TO_LIQUIDATE = BigInt(300 * Number(ASSET_DECIMALS['jUSDT'])) // 300$
export const MIN_AMOUNT_jUSDC_TO_LIQUIDATE = BigInt(300 * Number(ASSET_DECIMALS['jUSDC'])) // 300$
export const MIN_AMOUNT_tsTON_TO_LIQUIDATE = BigInt(53 * Number(ASSET_DECIMALS['tsTON'])) // 53 tsTON
export const MIN_AMOUNT_stTON_TO_LIQUIDATE = BigInt(53 * Number(ASSET_DECIMALS['stTON'])) // 53 stTON

// jettons are uset to excess liquidates
export const USED_ASSETS_IDS_TO_LIQUIDATES = [ASSET_ID.USDT]