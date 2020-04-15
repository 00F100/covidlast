export interface IRoute {
  method: string;
  path: string;
  cache?: string;
  beforeRequest?: (context: IRoute) => void;
  afterRequest?: (context: IRoute) => void;
}