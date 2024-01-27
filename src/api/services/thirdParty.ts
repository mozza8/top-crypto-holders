import { apiKeyChainbase, apiKeyEtherscan } from "../../constants/api";

export async function getTokenData(chainId: string, contractAddress: string) {
  try {
    const response = await fetch(
      `https://api.chainbase.online/v1/token/metadata?chain_id=${chainId}&contract_address=${contractAddress}`,
      {
        method: "GET",
        headers: {
          "x-api-key": apiKeyChainbase,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get ");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log("Error getting token data:", error);
    throw error;
  }
}

export async function getLastTransactionEtherscan(
  contractAddress: string,
  walletAddress: string
) {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${walletAddress}&page=1&offset=1&startblock=0&endblock=27025780&sort=desc&apikey=${apiKeyEtherscan}
            `,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get last transaction info");
    }
    const data = await response.json();
    return data.result[0];
  } catch (error) {
    console.log("Error getting last transaction:", error);
    throw error;
  }
}
