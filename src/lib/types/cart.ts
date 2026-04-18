/** Client-side cart line: snapshot for display; source of truth for availability is server/API at payment. */
export interface CartLine {
  plateId: string;
  prefix: string;
  number: string;
  price: number;
  province: string;
  addedAt: number;
}
