import { result } from "../../confi.js";
import { GetAccoutByIdDB, GetAccoutDatabase,InsertAccountDB, UpdatePasswordDB} from "../database/DBAccount.js"
import Account from "../model/Account.js";

export default class ctAccout{
    rt:result={
        err:false,
        result :[]
    }
    account:Account|undefined
    listAccount:Account[]
    constructor(){
        this.listAccount=[]
        this.account=undefined
    }
    async GetAccout(s:Account){
        this.Refesh();
        await GetAccoutDatabase(s)
        .then((v)=>{
          this.rt.result=v
        
        })
        .catch((v:result)=>{
            console.log(v.result);
            this.rt=v;
        })
        for (let i = 0; i < this.rt.result.length; i++) {
            const element = this.rt.result[i];
            this.account =new Account()
            this.account.setAll(element)
            break
        }
        return this.account
    }
    async InsertAccount(s:Account){
        await InsertAccountDB(s)
        .catch((v)=>{
            console.log(v);
            this.rt=v;
        })
        return this.rt
    }
    private Refesh(){
        this.listAccount=[]
        this.account=undefined
    }
    async UpdatePassword(account: string, password: string){
        var check=true;
        await UpdatePasswordDB(account,password)
        .then((v)=>{

        })
        .catch((v)=>{
            console.log(v);
            check=false
        })
        return check
    }
    setlistAccount(s:any){
        this.Refesh()
        this.account
        for (let i = 0; i < s.length; i++) {
            const element = s[i];
            
        }
    }
    async GetAccoutById(id:string){
       
        await GetAccoutByIdDB(id)
        .then((v)=>{
            this.account=new Account()
            this.account.setAll(v)
        })
        .catch((v)=>{
            console.log(v);
            this.account=undefined
        })
        return this.account
    }
}