import { publicClient, walletClient } from '@/utils/viem-client';
const contractKeyword = import.meta.env.DESCI_CONTRACT_KEYWORD;
const contractAuthor = import.meta.env.DESCI_CONTRACT_AUTHOR;
const hardhatAccount = import.meta.env.DESCI_HARDHAT_ACCOUNT;
import { abi as keywordAbi } from '@/abi/KeywordManager.json';
import { abi as AuthorAbi } from '@/abi/AuthorManager.json';
import type { IKeyword, IAuthor } from '@/types/article';

export { publicClient, walletClient };

export function addKeyword(name: string) {
  return walletClient.writeContract({
    address: contractKeyword,
    abi: keywordAbi,
    functionName: 'add',
    args: [name],
    account: hardhatAccount
  });
}

export function getKeywordByIndex(index: number) {
  return publicClient.readContract({
    address: contractKeyword,
    abi: keywordAbi,
    functionName: 'get',
    args: [index]
  }) as Promise<IKeyword>;
}

export function getKeywords() {
  return publicClient.readContract({
    address: contractKeyword,
    abi: keywordAbi,
    functionName: 'getList'
  }) as Promise<IKeyword[]>;
}

export function addAuthor(firstName: string, lastName: string, email: string, doi: string = '') {
  return walletClient.writeContract({
    address: contractAuthor,
    abi: AuthorAbi,
    functionName: 'add',
    args: [firstName, lastName, email, doi],
    account: hardhatAccount
  });
}

export function getAuthorByIndex(index: number) {
  return publicClient.readContract({
    address: contractAuthor,
    abi: AuthorAbi,
    functionName: 'get',
    args: [index]
  }) as Promise<IAuthor>;
}

export function editAuthor(author: IAuthor) {
  return walletClient.writeContract({
    address: contractAuthor,
    abi: AuthorAbi,
    functionName: 'set',
    args: [author],
    account: hardhatAccount
  });
}

export function getAuthors() {
  return publicClient.readContract({
    address: contractAuthor,
    abi: AuthorAbi,
    functionName: 'getList'
  }) as Promise<IAuthor[]>;
}
