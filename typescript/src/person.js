var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greet(person) {
    console.log(person.firstName + " " + person.lastName);
}
var jack = new Student('sam', 'yuan', 'wu');
greet(jack);
