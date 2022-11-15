import entity from "./interface/entity.js"

export default class Account extends entity{
    account:string
    password:string
    constructor(){
        super()
        this.account="",
        this.password=""
    }
    public setAll(d:any){
       super.setAll(d)
    }
    public getAccount() : string {
        return this.account;
    }
    public getPassword() : string {
        return this.password;
    }
    
    public setAccount(v : string) {
        this.account = v;
    }
    public setPassord(v : string) {
        this.password = v;
    }
    public json(){
       return super.json()
    }
}