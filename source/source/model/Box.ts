import { UpdateBoxTypeDB } from "../database/DBBox.js"
import entity from "./interface/entity.js"

export default class Box extends entity{
    idBox:string
    idUser:number
    nameUser:string
    avatar:string
    status:string
    constructor(){
        super()
        this.idBox=""
        this.idUser=0
        this.nameUser=""
        this.avatar=""
        this.status=""
    }
    
    setAll(p:any){
        super.setAll(p)
    }
    json():any{
        var s:any=super.json()
        return s
    }
    
}