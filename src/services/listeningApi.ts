// === GANTI 3 BAGIAN INI PAS DI LAB ===

// 1. URL API dari aslab
const URL = "https://jsonplaceholder.typicode.com/users";


interface RawItem {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  company: { name: string; catchPhrase: string; bs: string };
}

// 3. Mapper: data mentah jadi bentuk standar
const toItem = (raw: RawItem): Item => ({
  id: String(raw.id),
  title: raw.name,
  subtitle: "",
  body: raw.email,
});

export interface Item {
  id: string;
  title: string;
  subtitle: string;
  body: string;
}

// Async function: async/await
export async function fetchItems(): Promise<Item[]> {
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`Request gagal (${res.status})`);
  const data: RawItem[] = await res.json();
  return data.map(toItem);
}

// Promise manual: resolve, reject, then
export function fetchItemsPromise(): Promise<Item[]> {
  return new Promise((resolve, reject) => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          reject(new Error(`Request gagal (${res.status})`));
          return null;
        }
        return res.json() as Promise<RawItem[]>;
      })
      .then((data) => {
        if (data) resolve(data.map(toItem));
      })
      .catch(reject);
  });
}