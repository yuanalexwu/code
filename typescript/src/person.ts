class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial:string, public lastName:string) {
        this.fullName = `${firstName} ${middleInitial} ${lastName}`;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}


function greet(person: Person) {
    console.log(`${person.firstName} ${person.lastName}`);
}

const jack = new Student('sam', 'yuan', 'wu');
greet(jack);