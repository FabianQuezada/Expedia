export interface Review {
  score: number;
  author: string;
  text: string;
  date: string | Date; // Acepta tanto string ISO como objeto Date
}