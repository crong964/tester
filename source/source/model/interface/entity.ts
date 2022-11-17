export default class entity{
    constructor(){
        
    }
    setAll(p:any){
        for (const key in this) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const element = p[key];
                if (element!==undefined) {
                    this[key]=p[key]
                }
                
            }
        }
    }
    json(){
        var s:any = {}
        for (const key in this) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const element = this[key];
                if (element!==undefined) {
                    s[key]=element
                }
            }
        }
        return s
    }
}