export interface IFilial {
    id: number;
    name: string;
}
export interface IMenu {
    id: number;
  name: string;
  filial: {
    id: number;
    name: string;
  };
  tt: {
    id: number;
    name: string;
  };
  active: boolean;
  export: string[];
}

export interface IPaginatorMenu {
    max_pages: number;
    data: IMenu[];
  }