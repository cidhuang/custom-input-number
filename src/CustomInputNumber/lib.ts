
export function setFocus(name : string): void {
    let a =  (<any>document.getElementsByName(name))[0];
    let b = <HTMLInputElement>a;

    b.focus();
}

export function setDown(name : string): any {
    let a =  (<any>document.getElementsByName(name))[0];
    let b = <HTMLInputElement>a;

    let v0 = structuredClone(b.value);
    b.stepDown();
    b.focus();
    let v1 = structuredClone(b.value);
    if(v0 !== v1) {
        return v1;
    }
    return null;
}

export function setUp(name : string): any {
    let a =  (<any>document.getElementsByName(name))[0];
    let b = <HTMLInputElement>a;

    let v0 = structuredClone(b.value);
    b.stepUp();
    b.focus();
    let v1 = structuredClone(b.value);
    if(v0 !== v1) {
        return v1;
    }
    return null;
}
