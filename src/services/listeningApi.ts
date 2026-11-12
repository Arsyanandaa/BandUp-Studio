// === GANTI 3 BAGIAN INI PAS DI LAB ===

// 1. URL API dari aslab
const URL = "https://jsonplaceholder.typicode.com/posts?_limit=20";

// 2. Bentuk data mentah dari API (sesuaikan field-nya)
interface RawItem {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// 3. Mapper: data mentah jadi bentuk standar
const toItem = (raw: RawItem): Item => ({
  id: String(raw.id),
  title: raw.title,
  subtitle: `User ${raw.userId}`,
  body: raw.body,
});

// === BAGIAN DI BAWAH INI NGGAK PERLU DISENTUH ===

export interface Item {
  id: string;
  title: string;
  subtitle: string;
  body: string;
}

export async function fetchItems(): Promise<Item[]> {
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`Request gagal (${res.status})`);
  const data: RawItem[] = await res.json();
  return data.map(toItem);
}