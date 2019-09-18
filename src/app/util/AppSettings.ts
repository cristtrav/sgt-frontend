export class AppSettings {
  public static get urlAPI(): string {
    const hostname = window.location.hostname;
    return `http://${hostname}:3000/api`;
  }
}
