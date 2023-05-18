export class UserModel {

  public email: string;
  public username: string;
  public name: string;
  public lastname: string;
  public apps: number[];

  constructor(uo: UserObject) {
    this.email = uo.email;
    this.username = uo.username;
    this.name = uo.name;
    this.lastname = uo.lastname;
    this.apps = uo.apps;
  }

}

interface UserObject {
  email: string;
  username: string;
  name: string;
  lastname: string;
  apps: number[];
}
