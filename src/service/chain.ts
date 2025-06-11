import { publicClient, walletClient } from '@/utils/viem-client';
const contractKeyword = import.meta.env.DESCI_CONTRACT_KEYWORD;
const hardhatAccount = import.meta.env.DESCI_HARDHAT_ACCOUNT;
import { abi as keywordAbi } from '@/abi/KeywordManager.json';
import type { IKeyword } from '@/types/article';

export function addKeyword(name: string) {
  return walletClient.writeContract({
    address: contractKeyword,
    abi: keywordAbi,
    functionName: 'add',
    args: [name],
    account: hardhatAccount
  });
}

export async function getKeywords() {
  const total = (await publicClient.readContract({
    address: contractKeyword,
    abi: keywordAbi,
    functionName: 'getTotal'
  })) as number;
  const keywords = [];
  for (let i = 0; i < total; i++) {
    const keyword = (await publicClient.readContract({
      address: contractKeyword,
      abi: keywordAbi,
      functionName: 'get',
      args: [BigInt(i)]
    })) as IKeyword;
    keywords.push(keyword);
  }
  return keywords;
}
