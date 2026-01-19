'use server'

// 1. Export the interface so the client can use it
export interface WalletListing {
  id: string;
  name: string;
  image_id: string;
  homepage: string;
  // Add other fields if needed, but these are the ones we use
}

interface ExplorerResponse {
  listings: Record<string, WalletListing>;
  count: number;
}

const PROJECT_ID = "cec60107174feafc9d2be90943eee80f"; 
const BASE_URL = "https://explorer-api.walletconnect.com";

// 2. Explicitly type the return value as Promise<WalletListing[]>
export async function fetchWallets(search: string): Promise<WalletListing[]> {
  try {
    const endpoint = `${BASE_URL}/v3/wallets?projectId=${PROJECT_ID}&entries=100&page=1&search=${search}`;
    
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 3600 } 
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }

    const data: ExplorerResponse = await res.json();
    
    // 3. Ensure the result matches the type
    if (!data.listings) return [];

    return Object.values(data.listings);
    
  } catch (error) {
    console.error("Server Action Error:", error);
    return [];
  }
}