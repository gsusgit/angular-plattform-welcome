export class UserModel {

  public email: string;
  public username: string;
  public name: string;
  public lastname: string;
  public apps: number[];

  constructor(uo: UserObject) {
    // @ts-ignore
    this.email = uo && uo.email || null;
    // @ts-ignore
    this.username = uo && uo.username || null;
    // @ts-ignore
    this.name = uo && uo.name || null;
    // @ts-ignore
    this.lastname = uo && uo.lastname || null;
    // @ts-ignore
    this.apps = uo && uo.apps || null;
  }

}

interface UserObject {
  email: string;
  username: string;
  name: string;
  lastname: string;
  apps: number[];
}
