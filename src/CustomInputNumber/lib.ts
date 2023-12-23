
export function setDown(name : string): void {
    let a =  (<any>document.getElementsByName(name))[0];
    let b = <HTMLInputElement>a;
    b.stepDown();
}

export function setUp(name : string): void {
    let a =  (<any>document.getElementsByName(name))[0];
    let b = <HTMLInputElement>a;
    b.stepUp();
}
