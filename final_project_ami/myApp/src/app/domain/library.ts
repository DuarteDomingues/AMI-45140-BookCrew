export class Library{

    private name : string;
    private geo:[number, number];
    private libAdress: string;
    private pic: string;
    private schedule: {day: string, openingTime: string, closingTime: string }[]

    constructor(name:string, geo:[number, number], libAdress:string, pic:string,schedule:{day: string, openingTime: string, closingTime: string }[]){
        this.name=name;
        this.geo=geo;
        this.libAdress=libAdress;
        this.pic=pic;
        this.schedule=schedule;
    }

     // Getters
  public getName(): string {
    return this.name;
  }

  public getGeo(): [number, number] {
    return this.geo;
  }

  public getLibAddress(): string {
    return this.libAdress;
  }

  public getPic(): string {
    return this.pic;
  }

  public getSchedule(): {day: string, openingTime: string, closingTime: string }[] {
    return this.schedule;
  }

  // Setters
  public setName(name: string): void {
    this.name = name;
  }

  public setGeo(geo: [number, number]): void {
    this.geo = geo;
  }

  public setLibAddress(libAddress: string): void {
    this.libAdress = libAddress;
  }

  public setPic(pic: string): void {
    this.pic = pic;
  }

  public setSchedule(schedule: {day: string, openingTime: string, closingTime: string }[]): void {
    this.schedule = schedule;
  }



}