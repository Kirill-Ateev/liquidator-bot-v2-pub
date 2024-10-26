import {Address} from "@ton/core";
import {TonClient} from "@ton/ton";
import {ASSET_ID} from "../steady_config";
import {MIN_AMOUNT_jUSDC_TO_LIQUIDATE, MIN_AMOUNT_jUSDT_TO_LIQUIDATE, MIN_AMOUNT_stTON_TO_LIQUIDATE, MIN_AMOUNT_TON_TO_LIQUIDATE, MIN_AMOUNT_tsTON_TO_LIQUIDATE, MIN_AMOUNT_USDT_TO_LIQUIDATE} from "../variative_config";

type AddressState = "active" | "uninitialized" | "frozen";

export async function checkAddressState(tonClient: TonClient, address: Address): Promise<AddressState> {
    const accountState = await tonClient.getContractState(address);
    return accountState.state;
}

export function isValidLiquidationAmount(loanAsset: bigint, liquidationAmount: bigint): boolean {
    if (loanAsset === ASSET_ID.TON) {
        return liquidationAmount >= MIN_AMOUNT_TON_TO_LIQUIDATE
    } else if (loanAsset === ASSET_ID.USDT) {
        return liquidationAmount >= MIN_AMOUNT_USDT_TO_LIQUIDATE
    } else if (loanAsset === ASSET_ID.jUSDT) {
        return liquidationAmount >= MIN_AMOUNT_jUSDT_TO_LIQUIDATE
    } else if (loanAsset === ASSET_ID.jUSDC) {
        return liquidationAmount >= MIN_AMOUNT_jUSDC_TO_LIQUIDATE
    } else if (loanAsset === ASSET_ID.stTON) {
        return liquidationAmount >= MIN_AMOUNT_stTON_TO_LIQUIDATE
    } else if (loanAsset === ASSET_ID.tsTON) {
        return liquidationAmount >= MIN_AMOUNT_tsTON_TO_LIQUIDATE
    }

    return true
}

// Можно будет позднее добавить другие collateral и поднять планку для оптимальных ликвидаций
export function isValidCollateralAsset(collateralAsset: bigint): boolean {
    return collateralAsset === ASSET_ID.TON || collateralAsset === ASSET_ID.USDT
}