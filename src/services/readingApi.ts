const URL = "https://en.wikipedia.org/api/rest_v1/page/random/summary";

const HEADERS = {
  Accept: "application/json",
  "User-Agent": "BandUpStudio/1.0 (student project; contact: arsya@example.com)",
};

interface WikiResponse {
  title: string;
  description?: string;
  extract: string;
  thumbnail?: { source: string };
}

export interface Article {
  title: string;
  description: string;
  text: string;
  image?: string;
}

const toArticle = (data: WikiResponse): Article => ({
  title: data.title,
  description: data.description ?? "",
  text: data.extract,
  image: data.thumbnail?.source,
});

// Async function buatan sendiri, memakai fetch bawaan
export async function fetchArticle(): Promise<Article> {
const res = await fetch(URL, { headers: HEADERS });
  if (!res.ok) throw new Error(`Request gagal (${res.status})`);
  const data: WikiResponse = await res.json();
  return toArticle(data);
}

// Versi Promise manual: resolve, reject, then
export function fetchArticlePromise(): Promise<Article> {
  return new Promise((resolve, reject) => {
    fetch(URL, { headers: HEADERS })
      .then((res) => {
        if (!res.ok) {
          reject(new Error(`Request gagal (${res.status})`));
          return null;
        }
        return res.json() as Promise<WikiResponse>;
      })
      .then((data) => {
        if (data) resolve(toArticle(data));
      })
      .catch(reject);
  });
}